import {render} from "@testing-library/react";
import LeafMap from '@/app/components/LeafMap';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

jest.mock('react-leaflet', () => ({
    MapContainer: jest.fn(({children}) => <div>{children}</div>),
    TileLayer: jest.fn(() => <div>TileLayer</div>),
    Marker: jest.fn(({children}) => <div>{children}</div>),
    Popup: jest.fn(({children}) => <div>{children}</div>),
}));

const MockedMapContainer = MapContainer as jest.MockedFunction<typeof MapContainer>;
const MockedMarker = Marker as jest.MockedFunction<typeof Marker>;
const MockedTileLayer = TileLayer as jest.MockedFunction<typeof TileLayer>;
const MockedPopup = Popup as jest.MockedFunction<typeof Popup>;

describe('LeafMap component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders map component correctly', () => {
        const posix: [number, number] = [51.505, -0.09];
        render(<LeafMap posix={posix}/>);

        expect(MockedMapContainer).toHaveBeenCalled();
        expect(MockedTileLayer).toHaveBeenCalled();
        expect(MockedMarker).toHaveBeenCalled();
        expect(MockedPopup).toHaveBeenCalled();

        const mapContainerProps = MockedMapContainer.mock.calls[0][0];
        expect(mapContainerProps.center).toEqual(posix);
        expect(mapContainerProps.zoom).toBe(19);
        expect(mapContainerProps.scrollWheelZoom).toBe(false);
        expect(mapContainerProps.style).toEqual({height: "100%", width: "100%"});

        const markerProps = MockedMarker.mock.calls[0][0];
        expect(markerProps.position).toEqual(posix);
        expect(markerProps.draggable).toBe(false);
    });

    it('uses default zoom level when not provided', () => {
        const posix: [number, number] = [51.505, -0.09];
        render(<LeafMap posix={posix}/>);

        const mapContainerProps = MockedMapContainer.mock.calls[0][0];
        expect(mapContainerProps.zoom).toBe(19);
    });

    it('uses provided zoom level', () => {
        const posix: [number, number] = [51.505, -0.09];
        render(<LeafMap posix={posix} zoom={15}/>);

        const mapContainerProps = MockedMapContainer.mock.calls[0][0];
        expect(mapContainerProps.zoom).toBe(15);
    });
});