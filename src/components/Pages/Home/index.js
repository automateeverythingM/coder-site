import React from "react";
import HeroPractice from "../../Hero/HeroPractice";
import HeroRejected from "../../Hero/HeroRejected";
import HeroSearch from "../../Hero/HeroSearch";

export default function index() {
  return (
    <>
      <HeroSearch />
      <HeroRejected />
      <HeroPractice />
    </>
  );
}
