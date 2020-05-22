(ns alejandro.run.web
  (:require
   [clojure.string :as string]
   [hiccup.page :refer (html5)])
  (:import
   [java.text SimpleDateFormat]))

(def formatter
  (SimpleDateFormat. "dd MMM yyyy"))

(defn format-date
  [i]
  (when i
    (.format formatter i)))

(defn time-to-read
  [{:keys [ttr]}]
  (str ttr " min read"))

(defn navbar
  [page meta]
  [:navbar.navbar.sans.centered
   [:ul.nav-links
    [:li.home
     [:a {:href "/"}
      [:span.paren "("]
      (:site-title meta)
      [:span.paren ")"]]]
    [:li
     (case page
       :blog [:a.current-page {:href "/index.html"} "blog"]
       [:a {:href "/index.html"} "blog"])]
    [:li
     (case page
       :about [:a.current-page {:href "/about.html"} "about"]
       [:a {:href "/about.html"} "about"])]]
   [:ul.external-links
    [:li.icon-link
     #_[:a {:href "/feed.rss"}
      [:i.fas.fa-rss.rss
       {:title "RSS feed"}]]]
    [:li.icon-link
     [:a {:href "http://twitter.com/pvrrgrammer"}
      [:i.fab.fa-twitter.twitter
       {:title "Twitter"}]]]
    [:li.icon-link
     [:a {:href "http://github.com/purrgrammer"}
      [:i.fab.fa-github-alt.github
       {:title "GitHub"}]]]]])

(defn footer
  []
  [:footer.centered.sans
   [:div.license
    "Content on this site is licensed under a "
    [:a {:href "https://creativecommons.org/licenses/by/4.0/"}
     "Creative Commons Attribution 4.0 International license"]]
   [:p.fleuron "❦"]
   [:div.by
    "Made with "
    [:i.fa.fa-heart.heart
     {:title "love"}]
    " & "
    [:i.fa.fa-coffee.coffee
     {:title "coffee"}]
    " by "
    [:a {:href "http://github.com/purrgrammer"} "Alejandro Gómez"]]])

(defn html [{:keys [title
                    meta
                    page]} body]
  (html5 {:lang "en" :itemtype "http://schema.org/Blog"}
    [:head
     [:title title]
     [:meta {:charset "utf-8"}]
     ;; todo: meta description
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge,chrome=1"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     ;; CSS
     [:link {:rel "stylesheet" :href "highlight.css"}]
     [:link {:rel "stylesheet" :href "https://fonts.googleapis.com/css?family=Alegreya|Alegreya+Sans"}]
     [:link {:rel "stylesheet" :href "site.css"}]
     ;; Scripts
     [:script {:src "https://kit.fontawesome.com/7fe02c1764.js"
               :crossorigin "anonymous"}]
     [:script {:src "/highlight.pack.js"}]]
    [:body
     (navbar page meta)
     body
     (footer)
     [:script
      {:src "/main.js"}]]))

(defn about-entry [{meta :meta
                    entry :entry}]
  (html5
   [:section.about
    (:content entry)]) )

(defn about [{meta :meta
              entry :entries}]
  (html {:title (:site-title meta)
         :meta meta
         :page :about}
        (:content (first entry))))

(defn blog [{global-meta :meta posts :entries}]
  (html {:title (:site-title global-meta)
         :meta global-meta
         :page :blog}
        [:section.posts.centered
         [:ul
          (for [post posts
                :let [date
                      (format-date (:date-published post))]]
            [:li.post
             [:span.date.sans date]
             [:a.post-title
              {:href (:permalink post)}
              (:title post)]
             [:span.ttr.sans.tiny
              (time-to-read post)
              " "
              [:i.far.fa-clock]]])]]))

(defn post [{global-meta :meta posts :entries post :entry}]
  (html {:title (str (:site-title global-meta) " | " (:title post))
         :meta global-meta}
        [:article
         [:h1 (:title post)]
         [:div.article-meta
          [:span.tags.sans
            "tags: " (string/join ", " (:tags post))]
          [:span.ttr.sans
           [:i.far.fa-clock]
           " "
           (time-to-read post)]]
         (:content post)]))
