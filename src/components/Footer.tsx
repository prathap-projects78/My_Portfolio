const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Prathap. Built with passion.
          </p>
          <p className="text-muted-foreground text-sm">
            Powered by <span className="gradient-text font-medium">RAG Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
