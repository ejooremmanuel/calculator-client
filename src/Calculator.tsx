import { Box, Paper } from "@mui/material";
import React, { useMemo, useState } from "react";
import { evaluate } from "mathjs";
import { useCalculate } from "./hooks/calculator";

export const Calculator = () => {
  const [expression, setExpression] = useState("0");
  const [value, setValue] = useState("0");
  const [tracker, setTracker] = useState<
    { type: string; value: number | string }[]
  >([
    {
      value: 0,
      type: "number",
    },
  ]);
  const test = /^[\d()+\-*/. ]+$/g;

  const { mutate } = useCalculate();

  const lastAcceptedValue = useMemo(() => {
    if (tracker.length) return tracker[tracker.length - 1];
  }, [tracker]);
  const endValueIsNumber = useMemo(() => {
    if (tracker.length) {
      return tracker[tracker.length - 1]?.type === "number";
    }
  }, [tracker]);

  return (
    <div className="flex flex-col justify-between h-full gap-[3%] ">
      <Box component={Paper} className="screen h-[120px] !bg-black text-white">
        <input
          type="text"
          className="h-[50%] w-full border-0 bg-inherit !text-white outline-none hover:outline-none p-2 text-end text-lg font-[500]"
          readOnly
          value={expression}
        />
        {value && (
          <input
            type="text"
            className="h-[50%] w-full border-0 bg-inherit !text-white outline-none hover:outline-none p-2 text-end text-lg font-[500]"
            readOnly
            value={value}
          />
        )}
      </Box>
      <Box className="w-full h-full flex flex-col gap-1 relative">
        <Box className="flex-[.5] flex gap-3 justify-end p-3 items-center">
          <Box
            className="cursor-pointer text-lg font-[600] select-none"
            onClick={() => {
              setExpression("0");
              setTracker([
                {
                  value: 0,
                  type: "number",
                },
              ]);
            }}
          >
            C
          </Box>
          <Box
            className="cursor-pointer text-lg font-[600] select-none"
            onClick={() => {
              const value = expression.split(" ");
              const items = [...tracker];
              if (value?.length === 1 || expression === "0") {
                setExpression("0");
                setValue("0");
                setTracker([
                  {
                    value: 0,
                    type: "number",
                  },
                ]);
                return;
              } else {
                value.pop();
                items.pop();
                setExpression(value.join(" "));
                setTracker(items);
              }
            }}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7071 15.2938C11.3166 14.9033 11.3166 14.2701 11.7071 13.8796L13.5839 12.0027L11.7079 10.1267C11.3174 9.73617 11.3174 9.103 11.7079 8.71248C12.0984 8.32195 12.7316 8.32195 13.1221 8.71248L14.9982 10.5885L16.8796 8.70702C17.2702 8.3165 17.9033 8.3165 18.2938 8.70702C18.6844 9.09755 18.6844 9.73071 18.2938 10.1212L16.4124 12.0027L18.293 13.8833C18.6835 14.2739 18.6835 14.907 18.293 15.2975C17.9025 15.6881 17.2693 15.6881 16.8788 15.2975L14.9982 13.4169L13.1213 15.2938C12.7308 15.6843 12.0976 15.6843 11.7071 15.2938Z"
                fill="#0F0F0F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.6131 5.14653C6.18186 4.42266 7.05148 4 7.97206 4H20C21.6568 4 23 5.34315 23 7V17C23 18.6569 21.6568 20 20 20H7.97206C7.05148 20 6.18186 19.5773 5.6131 18.8535L1.68453 13.8535C0.829805 12.7656 0.829807 11.2344 1.68453 10.1465L5.6131 5.14653ZM7.97206 6C7.6652 6 7.37533 6.14089 7.18574 6.38218L3.25717 11.3822C2.97226 11.7448 2.97226 12.2552 3.25717 12.6178L7.18574 17.6178C7.37533 17.8591 7.6652 18 7.97206 18H20C20.5523 18 21 17.5523 21 17V7C21 6.44772 20.5523 6 20 6H7.97206Z"
                fill="#0F0F0F"
              />
            </svg>
          </Box>
        </Box>

        <Box className="grid grid-cols-[100px,auto] gap-1 justify-start h-full w-full">
          <Box className="buttons grid grid-rows-4 gap-2 h-full text-left">
            {calculatorButtons.map((item) => (
              <Box
                className="cursor-pointer text-lg w-20 h-20 font-[500] flex items-center justify-center select-none"
                color="#8A2F87"
                onClick={() => {
                  if (lastAcceptedValue?.type === "operation") return;
                  if (test.test(`${expression} ${item?.value}`))
                    setExpression((prev) => `${prev} ${item?.value} `);
                  setTracker((prev) => {
                    return [
                      ...prev,
                      {
                        value: item.value,
                        type: "operation",
                      },
                    ];
                  });
                }}
              >
                {item?.label}
              </Box>
            ))}
          </Box>
          <Box className="grid grid-cols-3 gap-2 w-full h-full ">
            {digits.map((item) => (
              <Box
                className="cursor-pointer text-lg w-20 h-20 font-[500] flex items-center justify-center select-none"
                color="#263238"
                onClick={() => {
                  if (test.test(`${expression} ${item?.value}`))
                    setTracker((prev) => {
                      return [
                        ...prev,
                        {
                          value: item.value,
                          type: "number",
                        },
                      ];
                    });
                  // eslint-disable-next-line eqeqeq
                  if (expression == "0") {
                    setExpression((prev) => `${item?.value}`);
                  } else {
                    setExpression((prev) => `${prev}${item?.value}`);
                  }
                }}
              >
                {item?.label}
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="flex justify-end items-end w-full">
          <Box
            className="cursor-pointer text-lg w-20 h-20 font-[600] select-none rounded bg-slate-700 flex items-center justify-center text-white"
            onClick={() => {
              if (endValueIsNumber) {
                setValue(evaluate(expression));
                setExpression("0");
                setTracker([
                  {
                    value: 0,
                    type: "number",
                  },
                ]);
                mutate({
                  expression,
                });
              }
            }}
          >
            =
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const calculatorButtons = [
  {
    type: "operation",
    label: "+",
    value: "+",
  },
  {
    type: "operation",
    label: "-",
    value: "-",
  },
  {
    type: "operation",
    label: "/",
    value: "/",
  },
  {
    type: "operation",
    label: "*",
    value: "*",
  },
];
const digits = [
  {
    type: "number",
    label: "1",
    value: 1,
  },
  {
    type: "number",
    label: "2",
    value: 2,
  },
  {
    type: "number",
    label: "3",
    value: 3,
  },
  {
    type: "number",
    label: "4",
    value: 4,
  },
  {
    type: "number",
    label: "5",
    value: 5,
  },
  {
    type: "number",
    label: "6",
    value: 6,
  },
  {
    type: "number",
    label: "7",
    value: 7,
  },
  {
    type: "number",
    label: "8",
    value: 8,
  },
  {
    type: "number",
    label: "9",
    value: 9,
  },
  {
    type: "number",
    label: "0",
    value: 0,
  },
];
