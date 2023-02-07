import { Button } from "@mui/material";
import clsx from "clsx";
import React from "react";

export default function Form({
  className = "",
  handleReset,
  children,
  showActionBtns = true,
  ...rest
}) {
  return (
    <form
      className={clsx(
        "bg-white p-5 grid place-items- gap-5 rounded-md",
        className
      )}
      {...rest}
    >
      {children}

      {showActionBtns && (
        <div className="flex gap-2">
          <Button
            type="reset"
            color="error"
            variant="outlined"
            onClick={() => handleReset?.()}
          >
            Reset
          </Button>

          <Button type="submit" color="success" variant="outlined">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
}

Form.Grid = ({ children }) => (
  <div className="w-full grid sm:grid-cols-2 gap-5">{children}</div>
);
