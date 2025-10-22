import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Story {
  id: string;
  image: string;
  client: string;
  certification: string;
  category: string;
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
              <div className="aspect-[4/3] relative">
                <img
                  src={story.image}
                  alt={`${story.client} - ${story.certification} - Sertifikasi ${story.category}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-lg mb-1">{story.client}</h3>
                <p className="text-sm text-white/90 mb-1">{story.certification}</p>
                <p className="text-xs text-white/80">{story.category}</p>
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-4xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={`${selectedImage.client} - ${selectedImage.certification}`}
              className="w-full h-auto rounded-lg"
            />
            <div className="bg-background/95 p-6 rounded-b-lg mt-2">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {selectedImage.client}
              </h3>
              <p className="text-muted-foreground mb-1">{selectedImage.certification}</p>
              <p className="text-sm text-muted-foreground">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SuccessStoriesSection;
