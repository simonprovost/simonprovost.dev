import {Canvas} from "@react-three/fiber";
import {motion} from "framer-motion";
import {useState, useRef} from "react";
import GrainyGradient from "../GrainyGradient/GrainyGradient";
import SnakeEffectContainer from "../snakeEffect/snakeEffect";
import "./GradientCard.css";

const GradientCard = () => {
    const [ripples, setRipples] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const cardRef = useRef(null);
    const rippleIdRef = useRef(0);

    const texts = [
        "PhD student <br/> <i> @ UKC </i>",
        "Former Researcher <br/> <i> @ NYU, VIDA lab </i>",
        "Former Researcher <br/> <i> @ NHS, via UoK </i>",
    ];

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    const handleClick = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            id: rippleIdRef.current++,
            x,
            y,
            startTime: currentTime,
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
        }, 2000);

        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    };

    return (
        <motion.div
            ref={cardRef}
            whileHover={{scale: 1.02}}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
            }}
            onClick={handleClick}
        >
            <div className="gradient-card__container">
                <Canvas camera={{position: [0, 0, 1]}} gl={{preserveDrawingBuffer: true}}>
                    <GrainyGradient ripples={ripples} onTimeUpdate={handleTimeUpdate}/>
                </Canvas>
            </div>
            <SnakeEffectContainer
                duration={0.5}
                delayIncrement={0.1}
                initialDelay={0.2}
                applyToSubchildren={false}
                parentStyle="gradient-card__text-container"
                childStyle="gradient-card__text"
                key={textIndex}
            >
                <span dangerouslySetInnerHTML={{__html: texts[textIndex]}}/>
            </SnakeEffectContainer>
        </motion.div>
    );
};

export default GradientCard;