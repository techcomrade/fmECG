import React from "react";
import { routeMapping } from "../layouts/routes.type";

interface IProps extends React.AllHTMLAttributes<HTMLElement> {}

export class ErrorBoundary extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    location.href = location.origin + "/#" + routeMapping.ErrorPage.url;
  }

  public render() {
    return this.props.children;
  }
}