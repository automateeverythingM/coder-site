import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import classes from "./herostyle.module.css";

export default function HeroRejected() {
  return (
    <Jumbotron fluid className="bg-white container row mx-auto">
      <div className={`col-4 ${classes.teamUp}`}></div>
      <div className="col-8">
        <h2 className="display-3">Find someone to build your project with</h2>
        <h2 className=" text-muted">
          Or build your experience on working with team
        </h2>
        <h3>Build your team and freelance</h3>{" "}
        <Button size="lg" variant="secondary">
          Create Team
        </Button>
      </div>
    </Jumbotron>
  );
}
