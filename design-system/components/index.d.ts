import type * as React from 'react';

export interface LogoProps {
  /** lockup = mark + MECH LEND wordmark (default); mark = the Visor alone. */
  variant?: 'lockup' | 'mark';
  /** Mark height in px. Default 24; minimum 16. */
  size?: number;
}
export declare function Logo(props: LogoProps): React.ReactElement;

export type LtvState = 'safe' | 'watch' | 'call' | 'neutral';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = white on Night, black on Studio; once per view. Default secondary. */
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger';
  size?: 'md' | 'sm';
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface LtvBadgeProps {
  /** safe → "Healthy", watch → "Watch", call → "Margin call", neutral → "Closed". */
  state?: LtvState;
  /** Overrides the default word. Keep it one or two words. */
  children?: React.ReactNode;
}
export declare function LtvBadge(props: LtvBadgeProps): React.ReactElement;

export interface LtvMeterProps {
  /** Current loan-to-value, in percent (e.g. 62.4). */
  ltv: number;
  /** Watch threshold in percent. Default 60. */
  watch?: number;
  /** Margin-call threshold in percent. Default 75. */
  call?: number;
  /** Scale maximum in percent. Default 100. */
  max?: number;
  label?: string;
}
export declare function LtvMeter(props: LtvMeterProps): React.ReactElement;

export interface StatProps {
  label: string;
  /** Pre-formatted figure: "$184,200.00", "62.4%". */
  value: React.ReactNode;
  note?: React.ReactNode;
  size?: 'lg' | 'sm';
  /** A color token name for the figure, e.g. "ltv-call". */
  tone?: string;
}
export declare function Stat(props: StatProps): React.ReactElement;

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Unit before the value, e.g. "$". */
  prefix?: string;
  /** Unit after the value, e.g. "%" or "months". */
  suffix?: string;
  help?: React.ReactNode;
  /** Replaces help and turns the field red. */
  error?: React.ReactNode;
  /** Mono, tabular figures and a decimal keypad. */
  numeric?: boolean;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

export interface CollateralCardProps {
  /** Humanoid, Quadruped, Industrial arm, Mobile platform (AMR), Aerial. */
  robotClass: string;
  /** Maker and model: "Kestrel H2". */
  model: string;
  serial: string;
  valuation: number;
  principal: number;
  /** APR in percent. */
  apr: number;
  watch?: number;
  call?: number;
  /** Shown as an LtvBadge top-right; omit to let the meter speak. */
  status?: LtvState;
  /** Actions, usually one or two Buttons size="sm". */
  children?: React.ReactNode;
}
export declare function CollateralCard(props: CollateralCardProps): React.ReactElement;

declare global {
  interface Window {
    MechLend: { Logo: typeof Logo; Button: typeof Button; LtvBadge: typeof LtvBadge; LtvMeter: typeof LtvMeter; Stat: typeof Stat; TextField: typeof TextField; CollateralCard: typeof CollateralCard };
  }
}
