import { Button, Modal } from "react-bootstrap";

function ModalComponent(props) {
  const { data } = props;
  return (
    data && (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Brand:&nbsp; {data.Country}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <h5>country:</h5>
              <h4>&nbsp;{data.Country}</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                marginLeft: 30,
              }}
            >
              <h5>rating:</h5>
              <h4>&nbsp;{data.Stars | 0}</h4>
            </div>
          </div>
          <p>{data.Variety}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant={"success"} onClick={props.onHide}>
            Order Now
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}
export default ModalComponent;
