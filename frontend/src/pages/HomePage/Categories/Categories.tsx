import { useEffect } from 'react';
import { ReactComponent as LeftArrowIcon } from '../../../assets/icons/Vector_left.svg';
import { ReactComponent as RightArrowIcon } from '../../../assets/icons/Vector_right.svg';
import { ReactComponent as CellPhoneIcon } from '../../../assets/icons/Category-CellPhone.svg';
import { ReactComponent as ComputerIcon } from '../../../assets/icons/Category-Computer.svg';
import { ReactComponent as SmartWatchIcon } from '../../../assets/icons/Category-SmartWatch.svg';
import { ReactComponent as CameraIcon } from '../../../assets/icons/Category-Camera.svg';
import { ReactComponent as HeadphoneIcon } from '../../../assets/icons/Category-Headphone.svg';
import { ReactComponent as GamepadIcon } from '../../../assets/icons/Category-Gamepad.svg';
import Icon, { CameraOutlined } from '@ant-design/icons';

const Categories = () => {
  const categoriesList = [
    {
      icon: (
        <CellPhoneIcon width="56px" height="56px" className="cursor-pointer" />
      ),
      name: 'Phones',
      categoryId: 'aaa',
    },
    {
      icon: (
        <ComputerIcon width="56px" height="56px" className="cursor-pointer" />
      ),
      name: 'Computers',
      categoryId: 'aaa',
    },
    {
      icon: (
        <SmartWatchIcon width="56px" height="56px" className="cursor-pointer" />
      ),
      name: 'SmartWatch',
      categoryId: 'aaa',
    },
    {
      icon: (
        <CameraIcon width="56px" height="56px" className="cursor-pointer" />
      ),
      name: 'Camera',
      categoryId: 'aaa',
    },
    {
      icon: (
        <HeadphoneIcon width="56px" height="56px" className="cursor-pointer" />
      ),
      name: 'Headphones',
      categoryId: 'aaa',
    },
    {
      icon: (
        <GamepadIcon width="56px" height="56px" className="cursor-pointer" />
      ),
      name: 'Gaming',
      categoryId: 'aaa',
    },
  ];
  useEffect(() => {}, []);
  return (
    <div className="categories-component-container">
      <div className="flex justify-between align-end">
        <div className="flex align-end">
          <div className="section-info-container">
            <div className="section-title-container flex align-center flex-gap">
              <div className="title-bar"></div>
              <div className="section-title">Categories</div>
            </div>
            <div className="flash-sales-title">Browse By Category</div>
          </div>
        </div>
        <div>
          <div className="flex flex-gap-05">
            <div className="arrow-icon-wrapper">
              <LeftArrowIcon />
            </div>
            <div className="arrow-icon-wrapper">
              <RightArrowIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex categories-list-container">
        {categoriesList.map((category: any, index: number) => (
          <div
            key={index}
            className="category-item-container flex align-center justify-center cursor-pointer"
          >
            <div className="text-center">
              <div className="category-icon-container">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;