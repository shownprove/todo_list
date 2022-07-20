import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

interface IForm {
  customCategory: string;
}

function CreateCustomCategory() {
  const setCustomCategory = useSetRecoilState(customCategoryState);
  const { register, handleSubmit, setValue } = useForm();
  const onValid = ({ customCategory }: IForm) => {
    setCustomCategory((Categories) => [
      { title: customCategory, id: Date.now() },
      ...Categories,
    ]);
    setValue("customCategory", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("customCategory")} placeholder="Write a Category" />
      <button>
        <i className="fas fa-plus-square">Add</i>
      </button>
    </form>
  );
}

export default CreateCustomCategory;
