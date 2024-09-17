import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import BookPage from "./BookPage";
import BookCover from "./BookCover";

const Book = () => {
  const pagesRef = useRef([]);
  const frontCoverRef = useRef(null);
  const backCoverRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCoverOpened, setIsCoverOpened] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const totalPages = 5;

  const addToPagesRef = (el) => {
    if (el && !pagesRef.current.includes(el)) {
      pagesRef.current.push(el);
    }
  };

  const openBookCover = () => {
    gsap.to(frontCoverRef.current.rotation, {
      y: -Math.PI / 2, // Rotate the front cover to the left side (open)
      duration: 1.5,
      ease: "power2.inOut",
    });
  };

  const closeBookCover = () => {
    gsap.to(frontCoverRef.current.rotation, {
      y: 0, // Return the cover to its original position (close)
      duration: 1.5,
      ease: "power2.inOut",
    });
  };

  const closeBackCover = () => {
    gsap.to(backCoverRef.current.rotation, {
      y: 0, // Close the back cover at the end
      duration: 1.5,
      ease: "power2.inOut",
    });
  };

  const flipPageForward = (pageIndex) => {
    const page = pagesRef.current[pageIndex];
    if (page) {
      gsap.to(page.rotation, {
        y: -Math.PI,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  const flipPageBackward = (pageIndex) => {
    const page = pagesRef.current[pageIndex];
    if (page) {
      gsap.to(page.rotation, {
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScroll;

    const newPage = Math.min(
      totalPages - 1,
      Math.floor(scrollFraction * (totalPages + 2))
    );

    const scrollDirection = scrollPosition > prevScrollPos ? "down" : "up";

    if (!isCoverOpened && scrollPosition > 50) {
      openBookCover();
      setIsCoverOpened(true);
    }

    if (isCoverOpened) {
      if (scrollDirection === "down" && newPage > currentPage) {
        flipPageForward(currentPage);
        setCurrentPage(newPage);
      } else if (scrollDirection === "up" && newPage < currentPage) {
        flipPageBackward(currentPage - 1);
        setCurrentPage(newPage);
      }
    }
    if (newPage === totalPages - 1 && scrollDirection === "down") {
      flipPageForward(newPage);
      closeBackCover();
    }

    if (scrollPosition <= 50) {
      closeBookCover();
      setIsCoverOpened(false);
      setCurrentPage(0);
    }

    setPrevScrollPos(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, isCoverOpened, prevScrollPos]);

  return (
    <group position={[0, -2, 0]}>
      <BookCover
        position={[0, 2, -0.05]}
        color="brown"
        text="End"
        ref={backCoverRef}
      />

      {[...Array(totalPages)].map((_, i) => (
        <BookPage
          key={i}
          position={[0, 2, i * 0.02]}
          rotation={[0, 0, 0]}
          ref={addToPagesRef}
        />
      ))}

      <BookCover
        position={[0, 2, 0.05]}
        rotation={[0, 0, 0]}
        color="brown"
        text="Start"
        ref={frontCoverRef}
      />
    </group>
  );
};

const BookScene = () => {
  return (
    <Canvas style={{ position: "fixed", width: "100vw", height: "100vh" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <Book />
    </Canvas>
  );
};

export default BookScene;
