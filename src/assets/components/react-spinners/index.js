import React, { useState } from 'react';
import {
    ClipLoader,
    BarLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    DotLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PulseLoader,
    RingLoader,
    RotateLoader,
    RiseLoader,
    ScaleLoader,
    SkewLoader,
    SquareLoader,
    SyncLoader
} from 'react-spinners';
import './react-spinners.css';

const override = `
    display:block;
    margin:0 auto;
    border-color:#033C73;
`;
// 36D7B7

const renderLoader = (loader, loading) => {
    return (<loader.name
        css={override}
        color={'#033C73'}
        loading={loading}
        size={loader.size && loader.size}
        width={loader.width && loader.width}
        height={loader.height && loader.height}
        margin={loader.margin && loader.margin}
    />
    )
}

const ReactSpinners = () => {
    const [loading] = useState(true);
    const LoaderNames = [
        { name: ClipLoader, size: 100 },
        { name: BarLoader, size: 15, width: 150, height: 10 },
        { name: BeatLoader, size: 50 },
        { name: BounceLoader, size: 120 },
        { name: CircleLoader, size: 120 },
        { name: ClimbingBoxLoader, size: 25 },
        { name: DotLoader, size: 100 },
        { name: GridLoader, size: 40 },
        { name: HashLoader, size: 100 },
        { name: MoonLoader, size: 100 },
        { name: PacmanLoader, size: 50 },
        { name: PropagateLoader, size: 30 },
        { name: PulseLoader, size: 45 },
        { name: RingLoader, size: 120 },
        { name: RiseLoader, size: 30 },
        { name: RotateLoader, size: 20, margin: 2 },
        { name: ScaleLoader, height: 80, width: 8 },
        { name: SkewLoader, size: 60 },
        { name: SquareLoader, size: 100 },
        { name: SyncLoader, size: 40 }];
    let LoaderIndex = Math.floor(Math.random() * 20);
    // let LoaderIndex = 19;

    return (
        <div className="content-center">
            <div className='sweet-loading'>
                {renderLoader(LoaderNames[16], loading.toString())}
            </div>
        </div>
    )
}

export default ReactSpinners;