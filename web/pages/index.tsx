import React, { HTMLAttributes } from "react";
import Meta from "partials/Meta";
import { useThemeContext } from "~/hoc/theme/ThemeContext";

const index = () => {
  const { theme } = useThemeContext();

  return (
    <div className={`bg-[${theme}]`}>
      <Meta
        title="Hydralite"
        description="Hydralite is the new open source platform for project management and open source project discovery."
        url="https://hydralite.io"
        keywords="open source,hydralite,project management"
      />
    </div>
  );
};

export default index;
