(set-env!
  :project 'alejandro.run
  :version "0.1.0"
  :source-paths #{"src"}
  :resource-paths #{"resources"}
  :dependencies '[[perun "0.4.3-SNAPSHOT" :scope "test"]
                  [hiccup "1.0.5" :exclusions [org.clojure/clojure]]
                  [pandeiro/boot-http "0.8.3" :exclusions [org.clojure/clojure]]])

(require '[io.perun :as perun]
         '[alejandro.run.web :as web]
         '[pandeiro.boot-http :refer [serve]])

(defn post?
  [{:keys [type]}]
  (= "post" type))

(deftask build
  []
  (comp
        (perun/global-metadata)
        (perun/markdown)
        (perun/draft)
        (perun/ttr)
        (perun/render :renderer 'alejandro.run.web/post
                      :filterer post?)
        (perun/collection :renderer 'alejandro.run.web/blog
                          :filterer post?
			  :page "index.html")
        (perun/tags :renderer 'alejandro.run.web/tag
                    :filterer post?)
        (target)
        (notify)))

(deftask dev
  []
  (comp (watch)
        (build)
        (serve :resource-root "public")))
