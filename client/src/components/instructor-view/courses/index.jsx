import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InstructorCourses() {
    const navigate = useNavigate();
    return ( 
       <Card>
         <CardHeader className="flex justify-between flex-row items-center">
         <CardTitle className="text-3xl font-extrabold ">All Courses</CardTitle>
         <Button
          onClick={()=> navigate("/instructor/create-new-course")}
          className="p-6">
          Create New Course
         </Button> 
         </CardHeader>
         <CardContent>
          <div  className="overflow-x-auto">
           <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
               <TableRow>
                <TableCell className="font-medium">React Js Full Course</TableCell>
                <TableCell className="font-medium">100</TableCell>
                <TableCell className="font-medium">$5000</TableCell>
                <TableCell className="font-medium">
                 <Button 
                          variant = "ghost">
                   <Edit className="h-6 w-6"/>
                 </Button>
                 <Button
                          variant = "ghost"
                          size="sm">
                    <Delete className="h-6 w-6"/>
                 </Button>
                </TableCell>

               </TableRow>
              </TableBody>
           </Table>
          </div>
         </CardContent>
       </Card>
     );
}

export default InstructorCourses;