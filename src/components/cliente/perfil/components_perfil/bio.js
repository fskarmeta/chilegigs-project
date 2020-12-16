import { Card } from "react-bootstrap";

const Bio = ({ biografia }) => {
  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title>Bio</Card.Title>
        <Card.Text>{!!biografia && biografia}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Bio;
