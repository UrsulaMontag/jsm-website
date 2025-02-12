import {CustomArrowProps} from "react-slick";
import {ReactNode} from "react";

type SlickButtonFixProps = {
    currentSlide: number | undefined;
    slideCount: number | undefined;
    children: ReactNode;
    props: CustomArrowProps;
}

export default function SlickButtonFix({currentSlide, slideCount, children, ...props}: Readonly<SlickButtonFixProps>) {
    return (
        <button {...props} className={
            "next-slick-arrow" +
            (slideCount !== undefined && currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
                aria-disabled={slideCount !== undefined && currentSlide === slideCount - 1}
                type="button"
        >
            {children}
        </button>
    );

};