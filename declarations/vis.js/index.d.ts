declare module 'viz.js' {
    import viz = require('viz.js');
    export default function (src: string, opts?: VizOpts): string;
}

interface VizOpts {
    format?: VizStringFormat;
    engine?: 'circo' | 'dot' | 'neato' | 'osage' | 'twopi';
    scale?: number;
    images?: Image[];
    totalMemory?: number;
    files?: File[];
}

type VizStringFormat = 'svg' | 'xdot' | 'plain' | 'ps' | 'json';

interface Image {
    href: string;
    height: string;
    width: string;
}

interface File {
    path: string;
    data: string;
}
