"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ERROR_BOUNDARY_COPY } from "@/constants/error-boundary.constants";
import { logClientError, reportClientError } from "@/lib/error-logger";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logClientError(error, { boundary: "AppErrorBoundary" });
    reportClientError(error, {
      boundary: "AppErrorBoundary",
      route: errorInfo.componentStack ?? undefined,
    });
  }

  handleTryAgain = (): void => {
    this.setState({ hasError: false });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center"
        role="alert"
      >
        <AlertCircle
          className="h-12 w-12 text-danger"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <h1 className="mt-4 text-[24px] font-semibold text-foreground md:text-[32px]">
          {ERROR_BOUNDARY_COPY.title}
        </h1>
        <p className="mt-3 max-w-md text-[15px] text-muted-fg">
          {ERROR_BOUNDARY_COPY.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button type="button" variant="brand" onClick={this.handleTryAgain}>
            {ERROR_BOUNDARY_COPY.tryAgainLabel}
          </Button>
          <Button type="button" variant="secondary" onClick={this.handleReload}>
            {ERROR_BOUNDARY_COPY.reloadLabel}
          </Button>
        </div>
      </div>
    );
  }
}
