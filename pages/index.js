import {
  Heading,
  Page,
  Card,
  Button,
  Stack,
  DropZone,
  PageActions,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { NoteMinor } from "@shopify/polaris-icons";

function Index() {
  const [active, setActive] = useState(true);
  const [file, setFile] = useState();

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleActive}>Upload Image</Button>;

  const handleDropZone = useCallback(
    (_dropFiles, acceptedFiles, rejectedFiles) =>
      setFile((file) => acceptedFiles[0]),
    []
  );

  const validImageTypes = ["image/png", "image/jpeg"];

  const uploadedFile = file && (
    <img
      src={
        validImageTypes.indexOf(file.type) > 0
          ? window.URL.createObjectURL(file)
          : NoteMinor
      }
      height="500"
    />
  );

  return (
    <div>
      <Page title="Window Shopping">
        <PageActions
          primaryAction={{
            content: "Save Image",
            onAction: () => {
              console.log("clicked save");
            },
          }}
          secondaryActions={[
            {
              content: "Upload Different Image",
              onAction: () => {
                setFile();
                console.log("clicked cancel");
              },
            },
          ]}
        />
        {!file ? (
          <div style={{ height: "500px" }}>
            <Stack vertical>
              <DropZone
                label="Image for window"
                allowMultiple={false}
                accept=".png, .jpg"
                errorOverlayText="File must be .png or .jpg type"
                type="file"
                onDrop={handleDropZone}
              >
                <DropZone.FileUpload />
              </DropZone>
            </Stack>
          </div>
        ) : (
          ""
        )}
        <div>{uploadedFile}</div>
      </Page>
    </div>
  );
}

export default Index;
