import '@testing-library/jest-dom'
import {render, screen} from "@testing-library/react";
import Home from "@/app/page";

describe('Home', () => {
        it(
            'renders the header', () => {
                render(<Home/>);
                const headerElement = screen.getByRole('heading', {level: 1});
                expect(headerElement).toBeInTheDocument();
            }
        )
    }
)