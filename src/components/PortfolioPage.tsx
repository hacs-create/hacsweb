import { ImageWithFallback } from './figma/ImageWithFallback';

export function PortfolioPage() {
  const projects = [
    { id: 1, title: 'Corporate Platform', category: 'Web Design' },
    { id: 2, title: 'E-commerce Solution', category: 'Development' },
    { id: 3, title: 'Brand Identity', category: 'Design System' },
    { id: 4, title: 'SaaS Application', category: 'UI/UX Design' },
    { id: 5, title: 'Mobile Experience', category: 'Responsive Design' },
    { id: 6, title: 'Enterprise Portal', category: 'Web Design' },
  ];

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="tracking-tight">NEXUS</div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 px-8 md:px-16 lg:px-24 py-16">
        <div className="mb-12">
          <h1 className="mb-4 tracking-tight">Our Portfolio</h1>
          <p className="text-gray-600 max-w-2xl">
            A curated selection of our recent work, showcasing innovative solutions across various industries.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-6xl">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 border border-gray-200 overflow-hidden mb-3 relative">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1730993872148-83acdfb597e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2MDQzNzQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080&sig=${project.id}`}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="text-sm mb-1">{project.title}</h3>
              <p className="text-xs text-gray-500">{project.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
