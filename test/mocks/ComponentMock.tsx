import * as React from "react";

export default (className?: string): React.StatelessComponent => {
    return (props: {children?: React.ReactNode}) => <div className={className}>{props.children}</div>;
};
