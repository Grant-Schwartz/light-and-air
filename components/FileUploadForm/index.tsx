import { Text, HStack, VStack, Button } from "@chakra-ui/react";
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from "@saas-ui/file-upload";
import { Form, FormLayout, createField } from "@saas-ui/forms";
import { SubmitButton } from "@saas-ui/react";
import { forwardRef, useState } from "react";
import { generateUUID } from "@/utils/uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UploadField = createField(
  forwardRef((props, ref) => {
    const { onChange, ...rest }: any = props;
    return (
      <FileUpload
        maxFiles={1}
        accept=".pdf"
        style={{
          minWidth: "400px",
        }}
        inputRef={ref}
        {...rest}
        onFilesChange={(files: any) => {
          onChange(files.acceptedFiles[0]);
        }}
      >
        {({ files, deleteFile }: any) => (
          <FileUploadDropzone
            style={{
              minWidth: "500px",
              height: "200px",
            }}
            onFilesChange={(files: any) => {
              console.log(files.acceptedFiles[0]);
            }}
          >
            <VStack>
              <Text fontSize="xl" color="primary">
                Upload a PDF with Tables
              </Text>
              {!files?.length ? (
                <FileUploadTrigger as={Button} style={{ fontWeight: "400" }}>
                  Select files
                </FileUploadTrigger>
              ) : (
                <VStack>
                  <Text fontSize="sm" color="primary">
                    {files[0].name}
                  </Text>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(files[0]);
                    }}
                  >
                    Clear
                  </Button>
                </VStack>
              )}
            </VStack>
          </FileUploadDropzone>
        )}
      </FileUpload>
    );
  }),
  {
    isControlled: true,
  }
);

export default function FormField() {
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  return (
    <Form
      onSubmit={async (data) => {
        console.log(data);
        setError(null);

        if (data.file) {
          var uuid = generateUUID();
          //   const { data: supabase_data, error } = await supabase.storage
          //     .from("data")
          //     .upload(`raw/${uuid}.pdf`, data.file);
          //   console.log("DATA", supabase_data);
          //   console.log("ERROR", error);
          //   if (error) {
          //     console.log("in");
          //     setError(error.message);
          //   } else {
          //     router.push(`/tables/${uuid}`);
          //   }
          // } else {
          //   setError("Please upload a file");
          //   return;
        }
      }}
    >
      {({ Field }) => (
        <FormLayout>
          <UploadField name="file" />
          {error && <Text color="red.400">{error}</Text>}
          <Button
            bgColor="primary"
            color="white"
            fontWeight="400"
            _hover={{ bgColor: "gray_dark" }}
            as={Link}
            href="/property/create"
          >
            Get Started
          </Button>
        </FormLayout>
      )}
    </Form>
  );
}
