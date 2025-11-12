import {Canvas} from "@react-three/fiber";
import {motion} from "framer-motion";
import {useState, useRef, useMemo, useEffect} from "react";
import PropTypes from "prop-types";
import GrainyGradient from "../GrainyGradient/GrainyGradient";
import SnakeEffectContainer from "../snakeEffect/snakeEffect";
import "./GradientCard.css";

const GradientCard = ({positions}) => {
    const [ripples, setRipples] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const cardRef = useRef(null);
    const rippleIdRef = useRef(0);

    const availablePositions = useMemo(
        () => positions.filter(
            (position) => Array.isArray(position.gradientLines) && position.gradientLines.length > 0
        ),
        [positions]
    );

    useEffect(() => {
        if (availablePositions.length === 0) {
            setTextIndex(0);
            return;
        }

        setTextIndex((prevIndex) => prevIndex % availablePositions.length);
    }, [availablePositions.length]);

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

        if (availablePositions.length > 0) {
            setTextIndex((prevIndex) => (prevIndex + 1) % availablePositions.length);
        }
    };

    if (availablePositions.length === 0) {
        return null;
    }

    const currentPosition = availablePositions[textIndex] ?? availablePositions[0];
    const lines = currentPosition?.gradientLines ?? [];

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
                <span className="gradient-card__text">
                    {lines.map((line, index) => (
                        <span key={`${line.text}-${index}`}>
                            {line.italic ? <i>{line.text}</i> : line.text}
                            {index < lines.length - 1 && <br/>}
                        </span>
                    ))}
                </span>
            </SnakeEffectContainer>
        </motion.div>
    );
};

GradientCard.defaultProps = {
    positions: [],
};

GradientCard.propTypes = {
    positions: PropTypes.arrayOf(
        PropTypes.shape({
            gradientLines: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    italic: PropTypes.bool,
                })
            ).isRequired,
        })
    ),
};

export default GradientCard;
