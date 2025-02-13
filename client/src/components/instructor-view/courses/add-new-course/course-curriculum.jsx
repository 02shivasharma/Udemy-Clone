import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";



function CourseCurriculum() {
    const { courseCurriculumFromData, setCourseCurriculumFromData,mediaUploadProgress, setMediaUploadProgress, mediaUploadProgressPercentage, setMediaUploadProgressPercentage} = useContext(InstructorContext);

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
    console.log(courseCurriculumFromData)
    return ( 
       <Card>
        <CardHeader>
         <CardTitle>Create Course Curriculum</CardTitle>
        </CardHeader>
        <CardContent>
         <Button onClick={handleNewLecture}>Add Lecture</Button>
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
                 <Input 
                type="file"
                accept="video/*"
                onChange={(event) => handleSingleLectureUpload(event, index)}
                className="mb-4"
                />
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