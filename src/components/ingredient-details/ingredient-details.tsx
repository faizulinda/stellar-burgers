import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIngredientById } from '@selectors';

type TIngredientDetailsProps = {
  showTitle?: boolean;
};

export const IngredientDetails: FC<TIngredientDetailsProps> = ({
  showTitle = false
}) => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredientData = useSelector(selectIngredientById(id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI
      ingredientData={ingredientData}
      showTitle={showTitle}
    />
  );
};
