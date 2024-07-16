import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

import { FieldGroup, Label } from "./ui/field";
import {
  NumberField,
  NumberFieldInput,
  NumberFieldSteppers,
} from "./ui/numberfield";

const DaysToPredictInput = (): JSX.Element => {
  const [dayToPredict, setDayToPredict] = useAppStore(
    useShallow((state) => [state.dayToPredict, state.setDayToPredict]),
  );

  const onDayToPredictChange = (value: number): void => {
    setDayToPredict(value);
  };

  return (
    <NumberField
      minValue={1}
      defaultValue={7}
      onChange={onDayToPredictChange}
      value={dayToPredict}
    >
      <Label className="text-lg">Days to predict</Label>
      <FieldGroup>
        <NumberFieldInput />
        <NumberFieldSteppers />
      </FieldGroup>
    </NumberField>
  );
};

export default DaysToPredictInput;
