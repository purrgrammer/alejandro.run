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
  [:header.navbar.sans.centered
   [:nav
    [:ul.nav-links
     [:li.home
      [:a {:href "/"}
       [:span.paren "("]
       [:span.site-title
        (:site-title meta)]
       [:span.paren ")"]]]
     [:li
      (case page
        :blog [:a.current-page {:href "/index.html"} "blog"]
        [:a {:href "/index.html"} "blog"])]
     [:li
      (case page
        :about [:a.current-page {:href "/about.html"} "about"]
        [:a {:href "/about.html"} "about"])]]]
   [:ul.external-links
    [:li
     [:a {:href "http://twitter.com/pvrrgrammer"}
      [:svg
       {:title "Twitter"
        :width "24px"
        :height "24px"
        :fill "#00AACE"
        :viewBox "0 0 24 24"}
       [:path {:d "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"}]]]]
    [:li
     [:a {:href "http://github.com/purrgrammer"}
      [:svg
       {:title "Github"
        :width "24px"
        :height "24px"
        :fill "#181717"
        :viewBox "0 0 24 24"}
       [:path {:d "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}]]]]]])

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
    [:svg
     {:title "Clojure"
      :width "16px"
      :height "16px"
      :fill "#00AACE"
      :viewBox "0 0 24 24"}
     [:path {:d "M11.503 12.216c-.119.259-.251.549-.387.858-.482 1.092-1.016 2.42-1.21 3.271a4.91 4.91 0 0 0-.112 1.096c0 .164.009.337.022.514.682.25 1.417.388 2.186.39a6.39 6.39 0 0 0 2.001-.326 3.808 3.808 0 0 1-.418-.441c-.854-1.089-1.329-2.682-2.082-5.362M8.355 6.813A6.347 6.347 0 0 0 5.657 12a6.347 6.347 0 0 0 2.625 5.134c.39-1.622 1.366-3.107 2.83-6.084-.087-.239-.186-.5-.297-.775-.406-1.018-.991-2.198-1.513-2.733a4.272 4.272 0 0 0-.947-.729M17.527 19.277c-.84-.105-1.533-.232-2.141-.446A7.625 7.625 0 0 1 4.376 12a7.6 7.6 0 0 1 2.6-5.73 5.582 5.582 0 0 0-1.324-.162c-2.236.02-4.597 1.258-5.58 4.602-.092.486-.07.854-.07 1.29 0 6.627 5.373 12 12 12 4.059 0 7.643-2.017 9.815-5.101-1.174.293-2.305.433-3.271.436-.362 0-.702-.02-1.019-.058M15.273 16.952c.074.036.242.097.475.163a6.354 6.354 0 0 0 2.6-5.115h-.002a6.354 6.354 0 0 0-6.345-6.345 6.338 6.338 0 0 0-1.992.324c1.289 1.468 1.908 3.566 2.507 5.862l.001.003c.001.002.192.637.518 1.48.326.842.789 1.885 1.293 2.645.332.51.697.876.945.983M12.001 0a11.98 11.98 0 0 0-9.752 5.013c1.134-.71 2.291-.967 3.301-.957 1.394.004 2.491.436 3.017.732.127.073.248.152.366.233A7.625 7.625 0 0 1 19.625 12a7.605 7.605 0 0 1-2.268 5.425c.344.038.709.063 1.084.061 1.328 0 2.766-.293 3.842-1.198.703-.592 1.291-1.458 1.617-2.757.065-.502.1-1.012.1-1.531 0-6.627-5.371-12-11.999-12"}]]
    " by "
    [:a {:href "http://github.com/purrgrammer"} "Alejandro Gómez"]]])

(defn html [{:keys [title
                    meta
                    page
                    keywords
                    description]} body]
  (html5 {:lang "en" :itemtype "http://schema.org/Blog"}
    [:head
     [:title title]
     [:meta {:charset "utf-8"}]
     (when (seq? keywords)
       [:meta {:name "keywords" :content (string/join ", " keywords)}])
     (when description
       [:meta {:name "description" :content description}])
     [:meta {:name "author" :content "Alejandro Gómez"}]
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge,chrome=1"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     ;; Open Graph
     [:meta {:property "og:title" :content title}]
     (when description
       [:meta {:property "og:description" :content description}])
     [:link {:rel "stylesheet" :href "https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,400;0,700;1,400&family=Alegreya:ital,wght@0,400;0,700;1,400&display=swap"}]
     [:link {:rel "stylesheet" :href "site.css"}]]
    [:body
     (navbar page meta)
     body
     (footer)
     [:link {:rel "stylesheet" :href "highlight.css"}]
     [:script {:src "/highlight.pack.js"}]
     [:script {:src "/main.js"}]]))

(defn about-entry [{meta :meta
                    entry :entry}]
  (html5
   [:section.about
    (:content entry)]) )

(defn about [{meta :meta
              entry :entries}]
  (html {:title (:site-title meta)
         :meta meta
         :page :about
         :description "(run alejandro) is a blog about software development. The topics treated here include functional programming, web development, Clojure(Script) and databases."}
        (:content (first entry))))

(defn post-list
  [posts]
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
       "&#128337;"
       (time-to-read post)]])])

(defn blog [{global-meta :meta posts :entries}]
  (html {:title (:site-title global-meta)
         :meta global-meta
         :page :blog
         :keywords ["software development", "clojure", "clojurescript", "web development", "functional programming", "databases"]
         :description "(run alejandro) is a blog about software development. The topics treated here include functional programming, web development, Clojure(Script) and databases."}
        [:section.posts.centered
         (post-list posts)]))

(defn tag->link
  [global-meta tag]
  (let [color (get-in global-meta
                      [:tags tag :color])
        icon (get-in global-meta
                     [:tags tag :icon])
        tiny-icon (update icon
                          1
                          assoc :width 14 :height 14 :fill color)]
    [:a.tag-link
     {:href (str "/" tag ".html")}
     tiny-icon
     " "
     [:span
      {:style (str "text-decoration: underline " color ";")}
      tag]]))

(defn post [{global-meta :meta posts :entries post :entry}]
  (html {:title (str (:site-title global-meta) " | " (:title post))
         :meta global-meta
         :keywords (:tags post)
         :description (:description post)}
        [:article
         [:h1.article-title
          (:title post)]
         [:div.article-meta.sans
          [:span.article-ttr
           "&#128337;"
           (time-to-read post)]
          [:div.tags
           (interpose ", "
                      (map #(tag->link global-meta %) (:tags post)))]]
         (:content post)]))

(defn tag
  [{global-meta :meta
    posts :entries
    entry :entry}]
  (let [tag (:tag entry)
        color (get-in global-meta
                     [:tags tag :color])
        icon (get-in global-meta
                     [:tags tag :icon])
        tiny-icon (update icon
                          1
                          assoc :width 24 :height 24 :fill color)]
    (html {:title (str (:site-title global-meta) " | Posts tagged " tag)
           :keywords [tag]
           :description (str "All entries tagged with " tag)
           :meta global-meta}
          [:section.tag-section.centered
           [:h1
            tiny-icon
            " "
            tag]
           [:section.posts
            (post-list posts)]])))
