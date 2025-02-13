import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";


function CourseSetting() {
  const {courseLandingFormData,setCourseLandingFormData,} = useContext(InstructorContext)
  async function handleImageChange(event){
    const selectedImage = event.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append('file', selectedImage);
    try{
       const response = await mediaUploadService(imageFormData);
       if(response.success){
          setCourseLandingFormData(
             {...courseLandingFormData, image : response.data.url}
          )
       }
    }catch(error){
      console.log(error)
    }
  }
  console.log(courseLandingFormData)
    return ( 
       <Card>
        <CardHeader>
        <CardTitle>Course Settings</CardTitle>
        </CardHeader>
        <CardContent>
        {courseLandingFormData.image ? <img src={courseLandingFormData.image} /> : 
        
         <div className="flex flex-col gap-2">
         <Label>Upload Course Image </Label>
         <Input 
         type="file"
         accept="file/*"
         onChange={(event) => handleImageChange(event)}
         />
         </div>}
        
        </CardContent>
       </Card>
     );
}

export default CourseSetting;