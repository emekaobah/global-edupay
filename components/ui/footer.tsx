import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className=" flex flex-col h-28  w-full fixed bottom-0">
      <div className="container flex flex-col my-auto mx-auto px-4 text-black">
        <p>&copy; 2024 Global Edupay. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
