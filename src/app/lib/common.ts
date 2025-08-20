export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface MetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
}
