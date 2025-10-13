export const containerVariants ={
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{
            staggerChildren :0.2,
            delayChildren : 0.3,
        },
    },
};
export const itemVariants={
    hidden:{y:30,opacity:0},
    visible:{
        y:0,
        opacity:1,
        transition:{
            duration:0.8,
            ease:"easeOut",
        },
    },
};