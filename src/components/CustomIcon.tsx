// components/FontAwesomeIcon.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect } from 'react';

interface CustomIconProps {
  icon: IconDefinition; // Use IconDefinition instead of IconProp
  [key: string]: any; // Allow any other props to be passed
}

const addedIcons = new Set<IconDefinition>(); // Track added icons

const CustomIcon: React.FC<CustomIconProps> = ({ icon, ...props }) => {
  useEffect(() => {
    // Add the icon to the library if it's not already added
    if (!addedIcons.has(icon)) {
      library.add(icon);
      addedIcons.add(icon);
    }
  }, [icon]); // Only run this effect when the icon prop changes

  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default CustomIcon;
