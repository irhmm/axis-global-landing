import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Story {
  id: string;
  image: string;
  client: string;
  certification: string;
  category: string;
  description?: string;
  tags?: string[];
}

const SuccessStoriesSection = () => {
  const [selectedImage, setSelectedImage] = useState<Story | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();

    const channel = supabase
      .channel("success-stories-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "success_stories",
        },
        () => {
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      const mappedStories: Story[] =
        data?.map((story) => ({
          id: story.id,
          image: story.image_url,
          client: story.title,
          certification: story.certification,
          category: story.category,
          description: story.description || undefined,
          tags: story.tags || undefined,
        })) || [];

      setStories(mappedStories);
    } catch (error) {
      console.error("Error fetching success stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedStories = showAll ? stories : stories.slice(0, 4);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kisah Sukses Klien Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi perjalanan sertifikasi bersama klien-klien terpercaya yang telah mempercayai layanan kami
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Belum ada kisah sukses yang ditampilkan
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedStories.map((story, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(story)}
            >
              {/* Image Container */}
              <div className="aspect-[4/3] relative">
                <img
                  src={story.image}
                  alt={`${story.client} - ${story.certification}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Text Content - Always Visible */}
              <div className="bg-background/95 backdrop-blur-sm p-4 border-t border-border">
                <h3 className="font-semibold text-base mb-1 text-foreground line-clamp-1">
                  {story.client}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                  {story.certification} • {story.category}
                </p>
                
                {/* Description Preview */}
                {story.description && (
                  <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>
                )}
              </div>
              
              {/* Hover Overlay - Read More Hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="px-4 py-2 bg-background text-primary font-semibold rounded-lg shadow-lg">
                  Baca Selengkapnya
                </span>
              </div>
            </div>
          ))}
            </div>

            {!showAll && stories.length > 4 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Lihat Selengkapnya ({stories.length - 4} Foto Lainnya)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal - Article Style */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-20"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-4xl w-full h-[85vh] bg-background rounded-xl shadow-2xl overflow-hidden animate-scale-in" 
            onClick={(e) => e.stopPropagation()}
          >
            <ScrollArea className="h-full">
              <article className="p-8 md:p-12 space-y-8">
                
                {/* Header with Title & Meta */}
                <header className="space-y-4 border-b border-border pb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {selectedImage.client}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                      {selectedImage.certification}
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                      {selectedImage.category}
                    </span>
                  </div>
                </header>

                {/* Featured Image - Smaller & Centered */}
                <figure className="space-y-3">
                  <div className="max-w-2xl mx-auto">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.client}
                      className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                  </div>
                  <figcaption className="text-center text-sm text-muted-foreground italic">
                    Dokumentasi Sertifikasi {selectedImage.certification}
                  </figcaption>
                </figure>

                {/* Article Content - Description */}
                {selectedImage.description && (
                  <section className="prose prose-lg max-w-3xl mx-auto">
                    <div className="space-y-4">
                      <p className="text-base md:text-lg text-muted-foreground leading-loose text-justify whitespace-pre-line">
                        {selectedImage.description}
                      </p>
                    </div>
                  </section>
                )}

                {/* Tags Footer */}
                {selectedImage.tags && selectedImage.tags.length > 0 && (
                  <footer className="border-t border-border pt-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-accent text-accent-foreground border border-border hover:bg-accent/80 transition-colors cursor-default"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </footer>
                )}

              </article>
            </ScrollArea>
          </div>
        </div>
      )}
    </section>
  );
};

export default SuccessStoriesSection;
