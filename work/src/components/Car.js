import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src:
      "https://res.cloudinary.com/dhey8vvcx/image/upload/v1606510424/img_nature_wide.jpg.jpg",
    altText: "Slide 1",
    caption: "Slide 1",
    header: "Slide 1 Header",
    key: "1",
  },
  {
    src:
      "https://res.cloudinary.com/dhey8vvcx/image/upload/v1606510442/img_lights_wide.jpg.jpg",
    altText: "Slide 2",
    caption: "Slide 2",
    header: "Slide 2 Header",
    key: "2",
  },
  {
    src:
      "https://res.cloudinary.com/dhey8vvcx/image/upload/v1606510459/img_mountains_wide.jpg.jpg",
    altText: "Slide 3",
    caption: "Slide 3",
    header: "Slide 3 Header",
    key: "3",
  },
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;
