(ns alejandro.run.web
  (:require [hiccup.page :refer (html5)])
  (:import
   [java.text SimpleDateFormat]))

(def formatter
  (SimpleDateFormat. "dd MMM yyyy"))

(defn format-date
  [i]
  (.format formatter i))

(defn html [{:keys [title
                    meta]} body]
  (html5 {:lang "en" :itemtype "http://schema.org/Blog"}
    [:head
     [:title title]
     [:meta {:charset "utf-8"}]
     [:meta {:http-equiv "X-UA-Compatible" :content "IE=edge,chrome=1"}]
     [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
     ;; CSS
     [:link {:rel "stylesheet" :href "highlight.css"}]
     [:link {:rel "stylesheet" :href "site.css"}]
     ;; Scripts
     [:script {:src "https://kit.fontawesome.com/7fe02c1764.js"
               :crossorigin "anonymous"}]
     [:script {:src "/highlight.pack.js"}]]
    [:body
     [:div.navbar
      [:a.home {:href "/"}
       (:site-title meta)]
      ]
     body
     [:footer
      [:ul.nav-links
       [:li
        [:a.icon-github {:href "http://github.com/purrgrammer"}
         [:i.fa.fa-github-alt]]]
       [:li
        [:a.icon-twitter {:href "http://twitter.com/pvrrgrammer"}
         [:i.fa.fa-twitter]]]
       [:li
        [:a.icon-rss {:href "/feed.rss"}
         [:i.fa.fa-rss]]]]]
     [:script
      {:src "/main.js"}]]))

(defn about [{global-meta :meta posts :entries}]
  (html {:title (:site-title global-meta)
         :meta global-meta}
        [:section
         [:h1 "About"]
         [:p  "This is a demonstration of a static page, for content that won't change"]]))

(defn index [{global-meta :meta posts :entries}]
  (html {:title (:site-title global-meta)
         :meta global-meta}
        [:section.posts
         [:ul
          (for [post posts
                :let [date
                      (format-date (:date-published post))]]
            [:li
             [:span.date.sans date]
             [:a.post-title {:href (:permalink post)} (:title post)]
             [:span.ttr.sans
              (str " " (:ttr post) " ")
              [:i.far.fa-clock]
              ]])]]))

(defn post [{global-meta :meta posts :entries post :entry}]
  (html {:title (str (:site-title global-meta) " | " (:title post))
         :meta global-meta}
        [:article
         [:h1 (:title post)]
         [:span.ttr.sans
          [:i.far.fa-clock]
          (str " " (:ttr post) " min read ")]
         (:content post)]))
