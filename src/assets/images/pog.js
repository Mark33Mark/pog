import React from "react";

const PogTitle = (props) => {

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className={props.className}
         height={props.height}
         width={props.width}
         version="1.1"
         viewBox="0 0 80 35.311"
      >

         <g transform="translate(-81.752 -49.963)">
         <g
            style={{ lineHeight: "1.25", InkscapeFontSpecification: "ISABELLE" }}
            strokeWidth="0.265"
            fontFamily="ISABELLE"
            fontSize="36"
         >
            <path
               style={{
               InkscapeFontSpecification: "'Gadugi Bold'",
               InkscapeStroke: "none",
               filter: "drop-shadow(3px 2px 2px rgb(0 0 0 / 0.4))"
               }}
               fill={props.p_color}
               strokeWidth="0.265"
               d="M98.644 72.838l-.067.017 6.88 10.005-5.275 1.414-17.43-25.352 5.274-1.413 1.796 2.611.066-.018q-.134-3.558 3.404-4.506 3.321-.89 6.721.95 3.405 1.819 6.145 5.804 2.985 4.341 2.672 7.537-.296 3.192-3.8 4.131-3.088.828-6.386-1.18zm-5.047-7.082l.956 1.39q1.236 1.798 2.952 2.683 1.716.886 3.234.48 1.803-.484 1.82-2.155.022-1.693-1.762-4.287-3.148-4.579-6.653-3.64-1.619.434-1.79 1.966-.168 1.51 1.243 3.563z"
            ></path>
            <path
               d="M118.972 69.842q-4.5 0-7.084-2.514-2.566-2.531-2.566-6.856 0-4.464 2.672-6.978 2.672-2.531 7.224-2.531 4.483 0 7.032 2.53 2.548 2.515 2.548 6.663 0 4.482-2.636 7.084-2.62 2.602-7.19 2.602zm.14-14.625q-1.968 0-3.058 1.353-1.09 1.354-1.09 3.832 0 5.186 4.184 5.186 3.99 0 3.99-5.327 0-5.044-4.025-5.044z"
               style={{filter: "drop-shadow(3px 2px 2px rgb(0 0 0 / 0.4))"}}
               fontFamily="Gadugi"
               fontWeight="bold"
               fill={props.o_color}
            ></path>
            <path
               d="M147.782 72.537q-2.543 5.09-7.066 7.875-4.532 2.803-10.47 2.803-3.927 0-5.696-1.053l2.374-4.75q2.177 1.643 5.231 1.643 3.036 0 5.464-1.518 2.419-1.5 3.713-4.089l.723-1.446h-.076q-3.584 3.071-7.587 3.071-3.718 0-4.668-2.464-.95-2.464 1.12-6.607 2.32-4.642 6.115-7.374 3.794-2.732 7.759-2.732 3.548 0 4.027 2.57h.076l1.062-2.124h5.995zm-2.572-6.696l.723-1.446q.866-1.732.373-2.946-.466-1.232-2.211-1.232-1.992 0-3.863 1.464-1.87 1.464-3.2 4.125-1.142 2.285-.73 3.624.42 1.322 2.299 1.322 1.86 0 3.667-1.34 1.836-1.356 2.942-3.57z"
               style={{filter: "drop-shadow(3px 2px 2px rgb(0 0 0 / 0.4))"}}
               strokeWidth="0.265"
               fontFamily="Gadugi"
               fontWeight="bold"
               fill={props.g_color}
            ></path>
         </g>
         </g>
      </svg>
   );
}

export default PogTitle;