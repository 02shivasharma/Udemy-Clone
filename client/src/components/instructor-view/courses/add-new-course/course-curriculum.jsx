import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService, mediaDeleteService, mediaBulkUploadService } from "@/services";
import { useContext, useRef } from "react";
import VideoPlayer from "@/components/video-player";
import { Upload } from "lucide-react";



function CourseCurriculum() {
    const { courseCurriculumFromData, setCourseCurriculumFromData,mediaUploadProgress, setMediaUploadProgress, mediaUploadProgressPercentage, setMediaUploadProgressPercentage} = useContext(InstructorContext);
     const bulkUploadInputRef = useRef(null) 
    function handleNewLecture (){
        setCourseCurriculumFromData([
                 ...courseCurriculumFromData,{
                    ...courseCurriculumInitialFormData[0]
                 }   ])
    }
     function handleCourseTitleChange(event, currentIndex) {
             setCourseCurriculumFromData(prevData => 
               prevData.map((item, index) => 
                index === currentIndex ? {...item , title : event.target.value} :  item 
               )
             );
  }
  function handleFreePreviewChange(value, currentIndex){
    setCourseCurriculumFromData(prevData => 
      prevData.map((item, index) => 
       index === currentIndex ? {...item , freePreview : value} : item
      )
    )
  }
   async function handleSingleLectureUpload(event, currentIndex){
     console.log(event.target.files);
     const selectedFiles = event.target.files[0];
     if(selectedFiles){
      const videoFromData = new FormData();
      videoFromData.append('file', selectedFiles);

      try{
         setMediaUploadProgress(true);
         const response = await mediaUploadService(videoFromData, setMediaUploadProgressPercentage);
         console.log(response);
         if(response.success){
            setCourseCurriculumFromData(prevData => 
               prevData.map((item, index)=> 
                 index === currentIndex ? {...item, public_id : response.data.public_id , videoUrl : response.data.url} : item
               )
            )
            setMediaUploadProgress(false)
         }
         
      }catch(error){
         console.log(error)
      }
        
     }
   }
   function isCourseCurriculumFormDataValid(){
      return  courseCurriculumFromData.every((item) => {
         return (
            item && 
            typeof item === "object" && 
            item.title.trim() !== "" &&
            item.videoUrl.trim() !== ""
         )
      })
   }
  async function handleReplaceVideo(currentIndex){
       let cpyCourseCurriculumData = [...courseCurriculumFromData];
       const getCurrentVideoPublicId = cpyCourseCurriculumData[currentIndex].public_id;
       const mediaDeleteResponse = await mediaDeleteService(getCurrentVideoPublicId);

       if(mediaDeleteResponse.success){
         setCourseCurriculumFromData(prevData =>
            prevData.map((item, index)=> index === currentIndex ? 
              {...item , videoUrl : '', public_id : ''} : item
            )
         )
       }
   }
   
   async function handleDeleteVideo(currentIndex){
     let cpyCourseCurriculumData = courseCurriculumFromData.filter((_, index)=> index !== currentIndex);
     const getCurrentSelectedVideoPublicId = cpyCourseCurriculumData[currentIndex]?.public_id;
     const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);
     if(response.success){
      cpyCourseCurriculumData = cpyCourseCurriculumData.filter((_, index)=> index !== currentIndex)
       setCourseCurriculumFromData(cpyCourseCurriculumData);
     }
   }

    function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }
   function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
  }

  async function handleMediaBulkUpload(event){
   
      const selectedFiles = Array.from(event.target.files);
      const bulkFormData = new FormData();
       
       selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));
        
   try{

      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(
         bulkFormData,
         setMediaUploadProgressPercentage
      );

      console.log(response, 'bulk');

     if(response?.success){
      let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFromData)
            ? []
            : [...courseCurriculumFromData];

        cpyCourseCurriculumFormdata = [
  ...cpyCourseCurriculumFormdata,
  ...(Array.isArray(response?.data) ? response.data.map((item, index) => ({
    videoUrl: item?.url,
    public_id: item?.public_id,
    title: `Lecture ${cpyCourseCurriculumFormdata.length + (index + 1)}`,
    freePreview: false,
  })) : []) // If response?.data is undefined, use an empty array
];
        setCourseCurriculumFromData(cpyCourseCurriculumFormdata);
        setMediaUploadProgress(false);
      }
    }catch(e){
      console.log((e));
      
   }
  }
    console.log(courseCurriculumFromData)
    return ( 
       <Card>
        <CardHeader className="flex flex-row justify-between">
         <CardTitle>Create Course Curriculum</CardTitle>
         <div>
         <Input
         ref={bulkUploadInputRef}
          type="file"
          accept="video/*"
          multiple
         className="hidden"
         id="bulk-media-upload"
         onChange={handleMediaBulkUpload}
          />
          <Button 
          variant="outline"
          htmlFor="bulk-media-upload"
          as="label"
          className="cursor-pointer"
          onClick={handleOpenBulkUploadDialog}
          >
           <Upload className="w-4 h-5 mr-2" />
           Bulk Upload
          </Button>
         </div>
        </CardHeader>
        <CardContent>
         <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} onClick={handleNewLecture}>Add Lecture</Button>
         {mediaUploadProgress ? (
            <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
            /> ) : null
         }
         <div className="mt-4 space-y-4">
         {courseCurriculumFromData.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
             <div className="flex gap-5"> 
              <h3 className="font-semibold">Lecture {index + 1}</h3>
              <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFromData[index]?.title}
                />
               <div className="flex items-center space-x-2">
                <Switch 
                onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                checked={courseCurriculumFromData[index]?.freePreview}
                id = {`freePreview-${index + 1}`}
                />
                <Label htmlFor={`freePreview-${index + 1}`} >Free Preview</Label>
               </div>
                </div>
                <div className="mt-6">
                {
                  
                  courseCurriculumFromData[index]?.videoUrl ? (
                     <div className="flex gap-3">
                      <VideoPlayer 
                      url={courseCurriculumFromData[index]?.videoUrl}
                      width="450px"
                      height="200px"
                       
                      />
                      <Button onClick={()=> handleReplaceVideo(index)}>Replace Video</Button>
                      <Button onClick={()=> handleDeleteVideo(index)} className="bg-red-900">Delete Lecture</Button> 
                     </div>
                  )
                  : (
                     <Input 
                      type="file"
                      accept="video/*"
                      onChange = {(event) => handleSingleLectureUpload(event, index)}
                      className="mb-4"
                      />
                  ) }       
               </div>
            </div>
         )
         )
         }    
         </div>
        </CardContent>
       </Card>
     );
}

export default CourseCurriculum;