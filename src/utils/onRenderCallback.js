import { profilerData } from './profilerData';

export function onRenderCallback(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
) {
    const interactionArray = interactions ? Array.from(interactions) : [];

    profilerData.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions: interactionArray,
    });

}