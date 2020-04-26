(set-env!
  :source-paths #{"src"}
  :resource-paths #{"resources"}
  :dependencies '[[perun "0.4.3-SNAPSHOT" :scope "test"]
                  [hiccup "1.0.5" :exclusions [org.clojure/clojure]]
                  [pandeiro/boot-http "0.8.3" :exclusions [org.clojure/clojure]]])

(require '[io.perun :as perun]
         '[alejandro.run.web :as web]
         '[pandeiro.boot-http :refer [serve]])

(deftask build
  []
  (comp
        (perun/global-metadata)
        (perun/markdown)
        (perun/draft)
        (perun/ttr)
        (perun/render :renderer 'alejandro.run.web/post)
        (perun/collection :renderer 'alejandro.run.web/index
			  :page "index.html")
        (perun/rss)
        (target)
        (notify)))

(deftask dev
  []
  (comp (watch)
        (build)
        (serve :resource-root "public")))
