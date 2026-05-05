import { 
  Home, 
  Palette, 
  Monitor, 
  Target, 
  Diamond, 
  MessageSquare,
  HelpCircle,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Layout,
  MessageCircle,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

// --- Components ---

const JegaLogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`aspect-square overflow-hidden flex items-center justify-start ${className}`}>
    <img 
      src="https://jega.vn/upload/image/logo/logo.png" 
      alt="JEGA"
      className="h-full w-auto max-w-none object-left"
    />
  </div>
);

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick,
  isRetracted = false
}: { 
  icon: any, 
  label: string, 
  active?: boolean,
  onClick: () => void,
  isRetracted?: boolean
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex md:flex-col flex-row md:justify-center justify-start items-center py-3 md:py-5 px-4 md:px-0 group transition-all relative outline-none cursor-pointer ${active ? 'text-jega-text' : 'text-jega-text-muted hover:text-jega-text hover:bg-black/5'}`}
  >
    {active && (
      <>
        <motion.div 
          layoutId="activeTabIndicatorDesktop"
          className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-jega-text rounded-r-full transition-all duration-300 ${isRetracted ? 'opacity-0 scale-y-0 group-hover/sidebar:opacity-100 group-hover/sidebar:scale-y-100' : 'opacity-100 scale-y-100'}`} 
        />
        <motion.div 
          layoutId="activeTabIndicatorMobile"
          className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-jega-text rounded-b-full" 
        />
      </>
    )}
    <div className={`flex flex-col items-center w-full transition-all duration-300 ${isRetracted ? 'opacity-0 group-hover/sidebar:opacity-100 scale-90 group-hover/sidebar:scale-100' : 'opacity-100 scale-100'}`}>
      <Icon className={`w-6 h-6 md:mb-1 ${active ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
      <span className="hidden md:block text-[9px] font-bold uppercase tracking-widest leading-none text-center">{label}</span>
    </div>
  </button>
);

const ProductCard = ({ icon: Icon, title, description, iconBgColor }: { icon: any, title: string, description: string, iconBgColor: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="jega-card jega-card-hover p-6 flex flex-col items-start h-full group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${iconBgColor}`}>
      <Icon className="w-6 h-6 text-jega-text" />
    </div>
    <div className="flex justify-between items-start w-full">
      <h3 className="text-lg font-semibold mb-2 group-hover:text-jega-red transition-colors">{title}</h3>
      {title === "ShowAI" && (
        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Mới</span>
      )}
    </div>
    <p className="text-jega-text-muted text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const ActivityItem = ({ title, product, time, iconColor }: { title: string, product: string, time: string, iconColor: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-jega-border last:border-0 group cursor-pointer hover:bg-gray-50/50 px-2 rounded-lg transition-colors gap-2 sm:gap-0">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full shrink-0 ${iconColor}`} />
      <span className="text-sm font-medium text-jega-text line-clamp-1">{title}</span>
    </div>
    <div className="flex items-center justify-between sm:justify-end sm:gap-6 w-full sm:w-auto pl-5 sm:pl-0">
      <span className="text-xs text-jega-text-muted whitespace-nowrap">{product}</span>
      <span className="text-xs text-gray-400 w-auto sm:w-20 text-right whitespace-nowrap">{time}</span>
    </div>
  </div>
);

export default function App() {
  const [userName] = useState("Thảo");
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedShowroom, setSelectedShowroom] = useState<string | null>(null);

  const showrooms = [
    {
      id: "shome",
      brand: "Shome",
      title: "Gạch & Thiết bị vệ sinh",
      url: "https://showroom.shome.vn/vi",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
      description: "Trải nghiệm showroom VR gạch ốp lát và thiết bị vệ sinh"
    },
    {
      id: "flexfit",
      brand: "Flexfit",
      title: "Nội thất chung cư",
      url: "https://showai.flexfit.vn/",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      description: "Bộ sưu tập inspiration cho căn hộ chung cư hiện đại"
    },
    {
      id: "ciara",
      brand: "Ciara",
      title: "Văn phòng & Nhà ở cao cấp",
      url: "https://vr360.noithatciara.com/vi/ciara?tabKey=product&tr=tour_96yhcylyfg7f&hl=72&vl=11&hs=itemjuv3enf3r4mg",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
      description: "Nội thất cao cấp cho văn phòng và không gian sống premium"
    }
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedShowroom(null);
  };

  const isFullView = activeTab !== "Home" || !!selectedShowroom;
  const externalViewUrls: Record<string, string> = {
    Contact: "https://clik.id/myclik",
    "Ask AI": "https://hotro.jega.vn/docs/intro",
    Visual: "https://sso.clik.vn/userauth/client-login"
  };
  const currentExternalUrl = selectedShowroom ? null : externalViewUrls[activeTab];

  const renderContent = () => {
    if (selectedShowroom) {
      const showroom = showrooms.find(s => s.url === selectedShowroom);
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-t-xl border-x border-t border-jega-border">
            <div className="flex items-center gap-2 px-2">
              <button 
                onClick={() => setSelectedShowroom(null)}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                title="Quay lại"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <div className="h-4 w-[1px] bg-gray-300 mx-1" />
              <span className="text-xs font-medium text-gray-500 truncate max-w-[200px] md:max-w-md">
                {selectedShowroom}
              </span>
            </div>
            <div className="flex gap-1.5 px-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>
          <div className="flex-1 min-h-0 bg-white border border-jega-border shadow-2xl rounded-b-xl overflow-hidden relative">
            <iframe 
              src={selectedShowroom} 
              className="absolute inset-0 w-full h-full border-0"
              title={showroom?.title || "Showroom"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      );
    }

    if (activeTab === "Show") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          <section>
            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <Layout className="w-6 h-6 text-jega-text" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1 font-sans">ShowAI - Showroom của bạn</h2>
                <p className="text-jega-text-muted text-base">Chọn showroom để xem trước hoặc chia sẻ với khách hàng</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {showrooms.map((showroom) => (
                <motion.div
                  key={showroom.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedShowroom(showroom.url)}
                  className="bg-white border border-jega-border rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full bg-gray-50 relative overflow-hidden">
                    <img 
                      src={showroom.image}
                      alt={showroom.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-sm text-jega-text-muted mb-2 block font-medium">{showroom.brand}</span>
                    <h3 className="text-lg font-bold mb-3 leading-tight group-hover:text-jega-red transition-colors">{showroom.title}</h3>
                    <p className="text-sm text-jega-text-muted/80 line-clamp-2 leading-relaxed mb-6">{showroom.description}</p>
                    <div className="mt-auto flex items-center gap-1.5 text-jega-red font-bold text-sm">
                      <span>Xem trực tiếp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      );
    }

    if (activeTab === "Contact") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div className="flex-1 min-h-0 bg-white border border-jega-border shadow-xl rounded-2xl overflow-hidden relative">
            <iframe 
              src="https://clik.id/myclik" 
              className="absolute inset-0 w-full h-full border-0"
              title="ContactAI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      );
    }

    if (activeTab === "Ask AI") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div className="flex-1 min-h-0 bg-white border border-jega-border shadow-xl rounded-2xl overflow-hidden relative">
            <iframe 
              src="https://hotro.jega.vn/docs/intro" 
              className="absolute inset-0 w-full h-full border-0"
              title="JEGA Help Docs"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      );
    }

    if (activeTab === "Visual") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div className="flex-1 min-h-0 bg-white border border-jega-border shadow-xl rounded-2xl overflow-hidden relative">
            <iframe 
              src="https://sso.clik.vn/userauth/client-login" 
              className="absolute inset-0 w-full h-full border-0"
              title="Visual AI Agents"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      );
    }

    if (activeTab !== "Home") {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Layout className="w-10 h-10 text-jega-text-muted opacity-20" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{activeTab}</h2>
          <p className="text-jega-text-muted">Tính năng đang được phát triển...</p>
          <button 
            onClick={() => handleTabChange("Home")}
            className="mt-6 text-jega-red font-medium hover:underline"
          >
            Quay lại trang chủ
          </button>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Greeting */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Chào {userName}</h2>
          <p className="text-jega-text-muted text-base md:text-lg">Hôm nay bạn muốn làm gì?</p>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          <ProductCard 
            icon={Sparkles} 
            title="JEGA Cloud Design" 
            description="Thiết kế nội thất 3D, render tự động"
            iconBgColor="bg-blue-50"
          />
          <div onClick={() => handleTabChange("Show")} className="cursor-pointer h-full">
            <ProductCard 
              icon={Layout} 
              title="ShowAI" 
              description="Showroom AI cho khách hàng của bạn"
              iconBgColor="bg-green-50"
            />
          </div>
          <div onClick={() => handleTabChange("Contact")} className="cursor-pointer h-full">
            <ProductCard 
              icon={Target} 
              title="ContactAI" 
              description="Tương tác khách hàng tự động"
              iconBgColor="bg-orange-50"
            />
          </div>
          <div onClick={() => handleTabChange("Visual")} className="cursor-pointer h-full">
            <ProductCard 
              icon={Diamond} 
              title="Visual Agents" 
              description="Tạo nội dung hình ảnh bằng AI"
              iconBgColor="bg-purple-50"
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-jega-text-muted">Hoạt động gần đây</h3>
          </div>
          <div className="bg-transparent space-y-1">
            <ActivityItem 
              title="Phòng khách Vista Tower T12" 
              product="Cloud Design" 
              time="2h trước" 
              iconColor="bg-blue-400"
            />
            <ActivityItem 
              title="Showroom Flexfit Inspiration" 
              product="ShowAI" 
              time="Hôm qua" 
              iconColor="bg-green-400"
            />
            <ActivityItem 
              title="Chiến dịch telesales tháng 11" 
              product="ContactAI" 
              time="2 ngày trước" 
              iconColor="bg-orange-400"
            />
          </div>
        </section>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex fixed top-0 left-0 bottom-0 w-20 bg-jega-sidebar border-r border-jega-border flex-col items-center py-6 z-50 transition-all duration-[400ms] cubic-bezier(0.4, 0, 0.2, 1) transform group/sidebar
          ${isFullView 
            ? '-translate-x-[72px] hover:translate-x-0 cursor-pointer shadow-2xl bg-white/95 backdrop-blur-md hover:bg-white' 
            : 'translate-x-0'}`}
      >
        {/* Expanded trigger area for better sensitivity */}
        {isFullView && <div className="absolute top-0 right-[-30px] bottom-0 w-10 z-[-1]" />}
        
        <div className={`mb-10 cursor-pointer transition-all duration-300 ${isFullView ? 'opacity-0 group-hover/sidebar:opacity-100 scale-90 group-hover/sidebar:scale-100' : 'opacity-100 scale-100'}`} onClick={() => handleTabChange("Home")}>
          <JegaLogoIcon className="w-10 h-10" />
        </div>
        
        <nav className="flex-1 w-full space-y-2">
          <SidebarItem icon={Home} label="Home" active={activeTab === "Home"} onClick={() => handleTabChange("Home")} isRetracted={isFullView} />
          <SidebarItem icon={Palette} label="Design" active={activeTab === "Design"} onClick={() => handleTabChange("Design")} isRetracted={isFullView} />
          <SidebarItem icon={Layout} label="Show" active={activeTab === "Show"} onClick={() => handleTabChange("Show")} isRetracted={isFullView} />
          <SidebarItem icon={MessageCircle} label="Contact" active={activeTab === "Contact"} onClick={() => handleTabChange("Contact")} isRetracted={isFullView} />
          <SidebarItem icon={Target} label="Visual" active={activeTab === "Visual"} onClick={() => handleTabChange("Visual")} isRetracted={isFullView} />
          <SidebarItem icon={MessageSquare} label="Ask AI" active={activeTab === "Ask AI"} onClick={() => handleTabChange("Ask AI")} isRetracted={isFullView} />
        </nav>

        <div className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0 cursor-pointer hover:bg-blue-200 transition-all duration-300 ${isFullView ? 'opacity-0 group-hover/sidebar:opacity-100' : 'opacity-100'}`}>
          TT
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 
        ${isFullView 
          ? 'md:ml-0 h-screen flex flex-col overflow-hidden p-4 sm:p-6' 
          : 'md:ml-20 p-4 sm:p-8 lg:p-12 mb-20 md:mb-0'} 
        w-full overflow-x-hidden`}
      >
        {/* Header */}
        <header className={`flex justify-between items-center shrink-0 transition-all duration-300 ${isFullView ? 'mb-4 md:pl-16' : 'mb-8 md:mb-12'}`}>
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <JegaLogoIcon className="w-8 h-8" />
            </div>
            <h1 className="text-lg md:text-xl font-semibold">
              {selectedShowroom 
                ? "Trải nghiệm Showroom" 
                : (activeTab === "Home" 
                    ? "Tổng quan" 
                    : (activeTab === "Show" 
                        ? "Showroom AI" 
                        : (activeTab === "Contact" 
                            ? "ContactAI" 
                            : (activeTab === "Ask AI" ? "Tài liệu hỗ trợ" : (activeTab === "Visual" ? "Visual Agents" : activeTab)))))}
            </h1>
            {currentExternalUrl && (
              <a
                href={currentExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                aria-label="Open in new tab"
                className="inline-flex h-8 w-8 items-center justify-center text-jega-text-muted hover:text-jega-red transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="flex items-center gap-2 border border-jega-border bg-white px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors">
              Hỗ trợ
            </button>
            <button className="p-2 border border-jega-border bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5 text-jega-text-muted" />
            </button>
            <div className="md:hidden w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0 ml-1">
              TT
            </div>
          </div>
        </header>

        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-jega-sidebar border-t border-jega-border z-30 flex justify-between px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <SidebarItem icon={Home} label="Home" active={activeTab === "Home"} onClick={() => handleTabChange("Home")} />
        <SidebarItem icon={Palette} label="Design" active={activeTab === "Design"} onClick={() => handleTabChange("Design")} />
        <SidebarItem icon={Layout} label="Show" active={activeTab === "Show"} onClick={() => handleTabChange("Show")} />
        <SidebarItem icon={MessageCircle} label="Contact" active={activeTab === "Contact"} onClick={() => handleTabChange("Contact")} />
        <SidebarItem icon={Target} label="Visual" active={activeTab === "Visual"} onClick={() => handleTabChange("Visual")} />
      </nav>
    </div>
  );
}
