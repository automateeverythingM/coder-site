import React from "react";
import { Badge } from "react-bootstrap";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";

export default function StatsInfo() {
    return (
        <div className="text-left mt-3">
            <Badge variant="dark" className="d-block text-left">
                <BsFillStarFill color="#ffc107" /> Ratting{" "}
                <span className="bg-danger px-1">32/100</span>
            </Badge>
            <Badge variant="dark">
                <AiFillThunderbolt color="#ffc107" /> Activity{" "}
                <span className="bg-danger px-1">87/100</span>
            </Badge>
        </div>
    );
}
