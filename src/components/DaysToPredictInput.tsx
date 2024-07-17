import { useShallow } from "zustand/react/shallow";

import { useAppStore } from "../store/app";

import { FieldGroup, Label } from "./ui/field";
import {
  NumberField,
  NumberFieldInput,
  NumberFieldSteppers,
} from "./ui/numberfield";

const DaysToPredictInput = (): JSX.Element => {
  const [daysToPredict, setDaysToPredict] = useAppStore(
    useShallow((state) => [state.daysToPredict, state.setDaysToPredict]),
  );

  const onDaysToPredictChange = (value: number): void => {
    setDaysToPredict(value);
  };

  return (
    <NumberField
      minValue={1}
      defaultValue={7}
      onChange={onDaysToPredictChange}
      value={daysToPredict}
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
