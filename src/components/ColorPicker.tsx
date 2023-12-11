import { BiSolidEyedropper } from "react-icons/bi";
import { HexColorPicker } from "react-colorful";
import { MdOutlineDone } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { FC, useState } from "react";
import { TColumn } from "../types";

interface ColorPickerProps {
  name: string;
  columns: TColumn[];
  onChangeColumnColor: any;
}

const ColorPicker: FC<ColorPickerProps> = ({
  name,
  columns,
  onChangeColumnColor,
}) => {
  const [keyOfEditingColumn, setKeyOfEditingColumn] = useState<string | null>(
    null
  );
  const [newColumnColor, setNewColumnColor] = useState("#EE4B4B");

  console.log(
    columns,
    name,
    columns?.filter((item) => item.name === name)[0]?.color
  );

  return (
    <div className="relative">
      <div
        className={twMerge(
          keyOfEditingColumn === name
            ? "border-2 border-accent"
            : "border-2 border-transparent",
          "w-7 h-7 relative rounded-[50%]"
        )}
        style={{
          backgroundColor: `${
            columns?.filter((item) => item.name === name)[0]?.color
          }60`,
        }}
      >
        <button
          onClick={() => {
            setKeyOfEditingColumn(() =>
              keyOfEditingColumn === name ? null : name
            );
            setNewColumnColor(
              columns.filter((item) => item.name === name)[0].color
            );
          }}
          className="w-5 h-5 overflow-hidden rounded-[50%] flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <BiSolidEyedropper className="text-xs overflow-hidden" />
        </button>
      </div>
      {keyOfEditingColumn === name && (
        <div className="flex gap-1 color-input example absolute z-50 top-[38px] mb-2">
          <HexColorPicker
            color={newColumnColor}
            onChange={setNewColumnColor}
            className="relative -left-1/3 border border-1 border-superLightGray"
          />
          <button
            onClick={() => {
              onChangeColumnColor(name, newColumnColor);
              setKeyOfEditingColumn(null);
              setNewColumnColor("#EE4B4B");
            }}
            className="relative -left-1/3 text-lg button-small bg-white h-[38px] w-[38px] border border-1 border-superLightGray"
            type="button"
          >
            <MdOutlineDone className="text-accent" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
