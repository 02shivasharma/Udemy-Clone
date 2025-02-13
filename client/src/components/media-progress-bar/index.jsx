import { useContext } from "react";
import { motion } from "framer-motion";
import { InstructorContext } from "@/context/instructor-context";

function MediaProgressbar({ isMediaUploading, progress }) {

  const {mediaUploadProgress, 
            mediaUploadProgressPercentage} = useContext(InstructorContext)
 

  if (!mediaUploadProgress) return null;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-5 mb-5 relative overflow-hidden">
      <motion.div
        className="bg-blue-600 h-3 rounded-full"
        initial={{ width: 0 }}
        animate={{
          width: `${mediaUploadProgressPercentage}%`,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        {progress >= 100 && isMediaUploading && (
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 bg-blue-400 opacity-50"
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default MediaProgressbar;