import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import classes from "./herostyle.module.css";

export default function HeroPractice() {
  return (
    <Jumbotron fluid className={`bg-dark text-white ${classes.ideaLight}`}>
      <div className="container mx-auto text-center">
        <div></div>
        <div>
          <h2 className="display-3 text-dark">Lights on your ideas</h2>
          <h2>No company takes money from you</h2>
          <h3>Build your team and freelance</h3>
          <Button size="lg" variant="secondary">
            Create Team
          </Button>
        </div>
      </div>
    </Jumbotron>
  );
}
