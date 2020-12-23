import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import GroupOfPeopleTeamUp from "../../../../img/GroupOfPeopleTeamUp.svg";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

export default function HeroRejected() {
    return (
        <Jumbotron fluid className="bg-white container row mx-auto">
            <div className="col-lg-4 col-md-5">
                <img
                    src={GroupOfPeopleTeamUp}
                    alt="group of people"
                    className="animate__rotateIn"
                    css={css`
                        transition: transform 1.5s ease-in-out;
                        &:hover {
                            transform: rotate(180deg);
                        }
                    `}
                />
            </div>
            <div className="col-lg-8 col-md-7">
                <h2 className="display-3">
                    Find someone to build your project with
                </h2>
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
