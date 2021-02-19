import {
  Heading,
  Page,
  Button,
  Stack,
  DropZone,
  Modal,
  Thumbnail,
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { NoteMinor } from "@shopify/polaris-icons";

// TODO need to arrange it so that the modal sends img data to parent component and closes.
// TODO maybe just remove modal entirely?

function ImageModal(props) {
  const [active, setActive] = useState(true);
  const [file, setFile] = useState();

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleActive}>Upload Image</Button>;

  // const handleDropZone = useCallback(
  //   (_dropFiles, acceptedFiles, rejectedFiles) =>
  //     setFile((file) => acceptedFiles[0]),
  //   []
  // );

  const handleDropZone = useCallback(
    (_dropFiles, acceptedFiles, rejectedFiles) =>
      props.setImage((file) => acceptedFiles[0]),
    []
  );

  const validImageTypes = ["image/png", "image/jpeg"];

  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.indexOf(file.type) > 0
            ? window.URL.createObjectURL(file)
            : NoteMinor
        }
      />
      <div>{file.name}</div>
      <div>{file.type}</div>
      <img
        src={
          validImageTypes.indexOf(file.type) > 0
            ? window.URL.createObjectURL(file)
            : NoteMinor
        }
        height="200"
      />
    </Stack>
  );

  return (
    <div style={{ height: "500px" }}>
      <Modal
        large
        activator={activator}
        open={active}
        onClose={toggleActive}
        title="Choose photo"
        primaryAction={{
          content: "Close",
          onAction: toggleActive,
        }}
      >
        <Modal.Section>
          <Stack vertical>
            <DropZone
              allowMultiple={false}
              accept=".png, .jpg"
              errorOverlayText="File must be .png or .jpg type"
              type="file"
              onDrop={(handleDropZone, toggleActive)}
            >
              <DropZone.FileUpload />
              {uploadedFile}
            </DropZone>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

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
      height="200"
    />
  );

  return (
    <div>
      {!file ? (
        <div style={{ height: "500px" }}>
          <Stack vertical>
            <DropZone
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
    </div>
  );
}

// class Index extends React.Component {
//   state = { img: {} };

//   setImage = (img) => {
//     this.setState({ img });
//   };

//   componentDidUpdate() {
//     // console.log(this.state.img);
//     console.log("hello");
//   }

//   render() {
//     return (
//       <Page
//         title="Window Shopping"
//         // primaryAction={{
//         //   content: "Select Product",
//         //   onAction: () => this.setState({ open: true }),
//         // }}
//       >
//         {" "}
//         <ImageModal setImage={this.setImage} />
//         {this.state.img.length > 0 ? (
//           <img src={window.URL.createObjectURL(this.state.img)} />
//         ) : (
//           ""
//         )}
//         {/* <ResourcePicker
//           resourceType="Product"
//           open={this.state.open}
//           onCancel={() => this.setState({ open: false })}
//           onSelection={(resources) => this.handleSelection(resources)}
//         /> */}
//       </Page>
//     );
//   }

//   // handleSelection = (resources) => {
//   //   const idFromResources = resources.selection.map((product) => product.id);
//   //   this.setState({ open: false });
//   //   console.log(idFromResources);
//   // };
// }

export default Index;
