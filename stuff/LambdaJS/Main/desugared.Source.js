(let
 (($global (alloc (object))))
 (let
  ((@Object_prototype (alloc (object))))
  (let
   ((@Function_prototype (alloc (object))))
   (let
    ((@isRefComb (lambda (f e)
                  (if (=== (typeof e) "location")
                   (f (deref e))
                   #f))))
    (let
     ((@toObject (lambda (x)
                  (if (=== (typeof x) "undefined")
                   (throw ($makeException "TypeError" "toObject received undefined"))
                   (if (=== x null)
                    (throw ($makeException "TypError" "toObject received null"))
                    (if (=== (typeof x) "boolean")
                     (alloc (object ("$proto" "$Boolean.prototype")
                                    ("$class" "Boolean")
                                    ("$value" x)))
                     (if (=== (typeof x) "number")
                      (alloc (object ("$proto" "$Number.prototype")
                                     ("$class" "Number")
                                     ("$value" x)))
                      (if (=== (typeof x) "string")
                       (alloc (object ("$proto" "$String.prototype")
                                      ("$class" "String")
                                      ("$value" x)))
                       x))))))))
     (let
      (($makeException (lambda (name msg)
                        (@newDirect (get-field
                                     $global
                                     name) (alloc (object ("0" msg)
                                                          ("length" 1.0)
                                                          ("$isArgs" #t)))))))
      (let
       ((@newDirect (lambda ($constr @argObj)
                     (if (if (if (=== (typeof $constr) "location")
                              (=== (typeof (deref $constr)) "object")
                              #f)
                          (=== (typeof (get-field
                                        (deref $constr)
                                        "$code")) "lambda")
                          #f)
                      (let
                       (($protoField (get-field
                                      (deref $constr)
                                      "prototype")))
                       (let
                        (($protoObj (if (if (=== (typeof $protoField) "location")
                                         (=== (typeof (deref $protoField)) "object")
                                         #f)
                                     $protoField
                                     @Object_prototype)))
                        (let
                         (($newObj (alloc (object ("$constructing" #t)
                                                  ("$class" "Object")
                                                  ("$proto" $protoField)))))
                         (let
                          ((newResult ((get-field
                                        (deref $constr)
                                        "$code") $newObj @argObj)))
                          (if (if (=== (typeof newResult) "location")
                               (=== (typeof (deref newResult)) "object")
                               #f)
                           newResult
                           (begin
                            (set!
                             $newObj
                             (delete-field (deref $newObj)
                              "$constructing"))
                            $newObj))))))
                      (throw ($makeException "TypeError" "new not given a function"))))))
       (let
        ((@toPrimitive (lambda (first second $x)
                        (if (=== (typeof $x) "location")
                         (let
                          ((str (lambda ()
                                 (let
                                  (($toStr (get-field
                                            (deref $x)
                                            second)))
                                  (if (if (if (=== (typeof $toStr) "location")
                                           (=== (typeof (deref $toStr)) "object")
                                           #f)
                                       (=== (typeof (get-field
                                                     (deref $toStr)
                                                     "$code")) "lambda")
                                       #f)
                                   (let
                                    (($tRes ((get-field
                                              (deref $toStr)
                                              "$code") $x (object ("length" 0.0)
                                                                  ("$isArgs" #t)))))
                                    (if (prim? $tRes)
                                     $tRes
                                     (throw ($makeException "TypeError" "cannot convert to primitive"))))
                                   (throw ($makeException "TypeError" "cannot convert to primitive")))))))
                          (let
                           (($vOf (get-field
                                   (deref $x)
                                   first)))
                           (if (if (if (=== (typeof $vOf) "location")
                                    (=== (typeof (deref $vOf)) "object")
                                    #f)
                                (=== (typeof (get-field
                                              (deref $vOf)
                                              "$code")) "lambda")
                                #f)
                            (let
                             (($tRes ((get-field
                                       (deref $vOf)
                                       "$code") $x (object ("length" 0.0)
                                                           ("$isArgs" #t)))))
                             (if (prim? $tRes)
                              $tRes
                              (str)))
                            (str))))
                         $x))))
        (let
         ((@toPrimitive_String (lambda (x)
                                (@toPrimitive "toString" "valueOf" x))))
         (let
          ((@toPrimitive_Number (lambda (x)
                                 (@toPrimitive "valueOf" "toString" x))))
          (let
           ((@toNumber (lambda ($toNum)
                        (if (=== (typeof $toNum) "location")
                         (prim->number (@toPrimitive_Number $toNum))
                         (prim->number $toNum)))))
           (let
            ((@OpGT (lambda (@x @y)
                     (let
                      (($opLhs @x)
                       ($opRhs @y))
                      (let
                       (($res (let
                               (($ltLhs (@toPrimitive_Number $opRhs))
                                ($ltRhs (@toPrimitive_Number $opLhs)))
                               (if (if (=== (typeof $ltLhs) "string")
                                    (=== (typeof $ltRhs) "string")
                                    #f)
                                (string-< $ltLhs $ltRhs)
                                (< (prim->number $ltLhs) (prim->number $ltRhs))))))
                       (if (=== (typeof $res) "undefined")
                        #f
                        $res))))))
            (let
             ((@OpLT (lambda (@x @y)
                      (let
                       (($opLhs @x)
                        ($opRhs @y))
                       (let
                        (($res (let
                                (($ltLhs (@toPrimitive_Number $opLhs))
                                 ($ltRhs (@toPrimitive_Number $opRhs)))
                                (if (if (=== (typeof $ltLhs) "string")
                                     (=== (typeof $ltRhs) "string")
                                     #f)
                                 (string-< $ltLhs $ltRhs)
                                 (< (prim->number $ltLhs) (prim->number $ltRhs))))))
                        (if (=== (typeof $res) "undefined")
                         #f
                         $res))))))
             (let
              ((@OpGEq (lambda (@x @y)
                        (let
                         (($opLhs @x)
                          ($opRhs @y))
                         (let
                          (($res (let
                                  (($ltLhs (@toPrimitive_Number $opLhs))
                                   ($ltRhs (@toPrimitive_Number $opRhs)))
                                  (if (if (=== (typeof $ltLhs) "string")
                                       (=== (typeof $ltRhs) "string")
                                       #f)
                                   (string-< $ltLhs $ltRhs)
                                   (< (prim->number $ltLhs) (prim->number $ltRhs))))))
                          (if (let
                               (($or (=== (typeof $res) "undefined")))
                               (if $or
                                $or
                                $res))
                           #f
                           #t))))))
              (let
               ((@OpLEq (lambda (@x @y)
                         (let
                          (($opLhs @x)
                           ($opRhs @y))
                          (let
                           (($res (let
                                   (($ltLhs (@toPrimitive_Number $opRhs))
                                    ($ltRhs (@toPrimitive_Number $opLhs)))
                                   (if (if (=== (typeof $ltLhs) "string")
                                        (=== (typeof $ltRhs) "string")
                                        #f)
                                    (string-< $ltLhs $ltRhs)
                                    (< (prim->number $ltLhs) (prim->number $ltRhs))))))
                           (if (let
                                (($or (=== (typeof $res) "undefined")))
                                (if $or
                                 $or
                                 $res))
                            #f
                            #t))))))
               (let
                ((@OpIn (lambda (@x @y)
                         (let
                          (($0
                            (let
                             (($toStr @x))
                             (if (=== (typeof $toStr) "location")
                              (prim->string (@toPrimitive_Number $toStr))
                              (prim->string $toStr))))
                           ($1
                            (@toObject @y)))
                          (has-own-prop? (deref $1) $0)))))
                (let
                 ((@OpInstanceof (lambda (@x @y)
                                  (let
                                   (($lhs @x)
                                    ($rhs @y))
                                   (if (if (@isRefComb (lambda (@x)
                                                        (let
                                                         (($isF @x))
                                                         (if (=== (typeof $isF) "object")
                                                          (=== (typeof (get-field
                                                                        $isF
                                                                        "$code")) "lambda")
                                                          #f))) $rhs)
                                        #f
                                        #t)
                                    (throw ($makeException "TypeError" ":instanceof args of wrong type"))
                                    (if (if (@isRefComb (lambda (@x)
                                                         (=== (typeof @x) "object")) $lhs)
                                         #f
                                         #t)
                                     #f
                                     (let
                                      (($2
                                        (get-field
                                         (deref $rhs)
                                         "prototype")))
                                      (let
                                       (($3
                                         (alloc $lhs))
                                        ($4
                                         (alloc #f)))
                                       (begin
                                        (label $break
                                         (while
                                          (if (=== (deref $3) null)
                                           #f
                                           #t)
                                          (if (=== (deref $3) $2)
                                           (begin
                                            (set!
                                             $4
                                             #t)
                                            (break $break
                                             undefined))
                                           (set!
                                            $3
                                            (get-field
                                             (deref (deref $3))
                                             "$proto")))))
                                        (deref $4))))))))))
                 (let
                  ((@OpEq (lambda (@x @y)
                           (let
                            (($lhs @x)
                             ($rhs @y))
                            (if (== $lhs $rhs)
                             #t
                             (if (=== (typeof $lhs) "location")
                              (== (@toPrimitive_Number $lhs) $rhs)
                              (if (=== (typeof $rhs) "location")
                               (== $lhs (@toPrimitive_Number $rhs))
                               #f)))))))
                  (let
                   ((@OpNEq (lambda (@x @y)
                             (if (let
                                  (($lhs @x)
                                   ($rhs @y))
                                  (if (== $lhs $rhs)
                                   #t
                                   (if (=== (typeof $lhs) "location")
                                    (== (@toPrimitive_Number $lhs) $rhs)
                                    (if (=== (typeof $rhs) "location")
                                     (== $lhs (@toPrimitive_Number $rhs))
                                     #f))))
                              #f
                              #t))))
                   (let
                    ((@OpStrictNEq (lambda (@x @y)
                                    (if (=== @x @y)
                                     #f
                                     #t))))
                    (let
                     ((@OpStrictEq (lambda (@x @y)
                                    (=== @x @y))))
                     (let
                      ((@OpLAnd (lambda (@x @y)
                                 (let
                                  (($lAnd @x))
                                  (if (if (prim->bool $lAnd)
                                       #f
                                       #t)
                                   $lAnd
                                   @y)))))
                      (let
                       ((@OpLOr (lambda (@x @y)
                                 (let
                                  (($lOr @x))
                                  (if (prim->bool $lOr)
                                   $lOr
                                   @y)))))
                       (let
                        ((@OpMul (lambda (@x @y)
                                  (let
                                   (($opLhs @x)
                                    ($opRhs @y))
                                   (let
                                    (($opLhs2 (@toNumber $opLhs))
                                     ($opRhs2 (@toNumber $opRhs)))
                                    (* $opLhs2 $opRhs2))))))
                        (let
                         ((@OpDiv (lambda (@x @y)
                                   (let
                                    (($opLhs @x)
                                     ($opRhs @y))
                                    (let
                                     (($opLhs2 (@toNumber $opLhs))
                                      ($opRhs2 (@toNumber $opRhs)))
                                     (/ $opLhs2 $opRhs2))))))
                         (let
                          ((@OpMod (lambda (@x @y)
                                    (let
                                     (($opLhs @x)
                                      ($opRhs @y))
                                     (let
                                      (($opLhs2 (@toNumber $opLhs))
                                       ($opRhs2 (@toNumber $opRhs)))
                                      (% $opLhs2 $opRhs2))))))
                          (let
                           ((@OpSub (lambda (@x @y)
                                     (let
                                      (($opLhs @x)
                                       ($opRhs @y))
                                      (let
                                       (($opLhs2 (@toNumber $opLhs))
                                        ($opRhs2 (@toNumber $opRhs)))
                                       (- $opLhs2 $opRhs2))))))
                           (let
                            ((@OpLShift (lambda (@x @y)
                                         (let
                                          (($opLhs @x)
                                           ($opRhs @y))
                                          (let
                                           (($lhsShift (to-int-32 (@toNumber $opLhs)))
                                            ($rhsShift (to-uint-32 (@toNumber $opRhs))))
                                           (let
                                            (($rhsShift2 (& $rhsShift (to-integer 31.0))))
                                            (<< $lhsShift $rhsShift2)))))))
                            (let
                             ((@OpSpRShift (lambda (@x @y)
                                            (let
                                             (($opLhs @x)
                                              ($opRhs @y))
                                             (let
                                              (($lhsShift (to-int-32 (@toNumber $opLhs)))
                                               ($rhsShift (to-uint-32 (@toNumber $opRhs))))
                                              (let
                                               (($rhsShift2 (& $rhsShift (to-integer 31.0))))
                                               (>> $lhsShift $rhsShift2)))))))
                             (let
                              ((@OpZfRShift (lambda (@x @y)
                                             (let
                                              (($opLhs @x)
                                               ($opRhs @y))
                                              (let
                                               (($lhsShift (to-int-32 (@toNumber $opLhs)))
                                                ($rhsShift (to-uint-32 (@toNumber $opRhs))))
                                               (let
                                                (($rhsShift2 (& $rhsShift (to-integer 31.0))))
                                                (>>> $lhsShift $rhsShift2)))))))
                              (let
                               ((@OpBAnd (lambda (@x @y)
                                          (let
                                           (($opLhs @x)
                                            ($opRhs @y))
                                           (let
                                            (($bitLhs (to-int-32 (@toNumber $opLhs)))
                                             ($bitRhs (to-int-32 (@toNumber $opRhs))))
                                            (& $bitLhs $bitRhs))))))
                               (let
                                ((@OpBXor (lambda (@x @y)
                                           (let
                                            (($opLhs @x)
                                             ($opRhs @y))
                                            (let
                                             (($bitLhs (to-int-32 (@toNumber $opLhs)))
                                              ($bitRhs (to-int-32 (@toNumber $opRhs))))
                                             (^ $bitLhs $bitRhs))))))
                                (let
                                 ((@OpBOr (lambda (@x @y)
                                           (let
                                            (($opLhs @x)
                                             ($opRhs @y))
                                            (let
                                             (($bitLhs (to-int-32 (@toNumber $opLhs)))
                                              ($bitRhs (to-int-32 (@toNumber $opRhs))))
                                             (\| $bitLhs $bitRhs))))))
                                 (let
                                  ((@OpAdd (lambda (@x @y)
                                            (let
                                             (($opLhs @x)
                                              ($opRhs @y))
                                             (let
                                              (($addLhs (@toPrimitive_Number $opLhs))
                                               ($addRhs (@toPrimitive_Number $opRhs)))
                                              (if (let
                                                   (($or (=== (typeof $addLhs) "string")))
                                                   (if $or
                                                    $or
                                                    (=== (typeof $addRhs) "string")))
                                               (string-+ (prim->string $addLhs) (prim->string $addRhs))
                                               (+ (prim->number $addLhs) (prim->number $addRhs))))))))
                                  (let
                                   ((@PrefixLNot (lambda (@x)
                                                  (if (prim->bool @x)
                                                   #f
                                                   #t))))
                                   (let
                                    ((@PrefixBNot (lambda (@x)
                                                   (~ (to-int-32 (@toNumber @x))))))
                                    (let
                                     ((@PrefixPlus (lambda (@x)
                                                    (@toNumber @x))))
                                     (let
                                      ((@PrefixMinus (lambda (@x)
                                                      (- 0.0 (@toNumber @x)))))
                                      (let
                                       ((@PrefixTypeof (lambda (@x)
                                                        (surface-typeof (let
                                                                         (($x @x))
                                                                         (if (=== (typeof $x) "location")
                                                                          (deref $x)
                                                                          $x))))))
                                       (let
                                        ((@PrefixVoid (lambda (@x)
                                                       (begin
                                                        (let
                                                         (($x @x))
                                                         (if (=== (typeof $x) "location")
                                                          (deref $x)
                                                          $x))
                                                        undefined))))
                                        (let
                                         ((@delete (lambda ($delObj $delStr)
                                                    (if (obj-can-delete? (deref $delObj) $delStr)
                                                     (begin
                                                      (set!
                                                       $delObj
                                                       (delete-field (deref $delObj)
                                                        $delStr))
                                                      #t)
                                                     #f))))
                                         (let
                                          ((@setArray (lambda (@o @f @v)
                                                       (if (=== @f "length")
                                                        (throw "setting .length of array NYI")
                                                        (let
                                                         (($5
                                                           (set!
                                                            @o
                                                            (update-field (deref @o)
                                                             @f
                                                             @v))))
                                                         (if (let
                                                              (($isai @f))
                                                              (if (=== (typeof $isai) "string")
                                                               (let
                                                                (($intai (to-uint-32 (prim->number $isai))))
                                                                (if (if (=== $intai 4.294967295e9)
                                                                     #f
                                                                     #t)
                                                                 (=== (prim->string $intai) $isai)
                                                                 #f))
                                                               #f))
                                                          (let
                                                           (($aindx (prim->number @f))
                                                            ($curln (get-field
                                                                     (deref @o)
                                                                     "length")))
                                                           (if (< $aindx $curln)
                                                            $5
                                                            (begin
                                                             (set!
                                                              @o
                                                              (update-field (deref @o)
                                                               "length"
                                                               (+ $aindx 1.0)))
                                                             $5)))
                                                          $5))))))
                                          (begin
                                           (set!
                                            @Object_prototype
                                            (update-field (deref @Object_prototype)
                                             "$proto"
                                             null))
                                           (begin
                                            (set!
                                             @Object_prototype
                                             (update-field (deref @Object_prototype)
                                              "$class"
                                              "Object"))
                                            (begin
                                             (set!
                                              @Object_prototype
                                              (update-field (deref @Object_prototype)
                                               "constructor"
                                               undefined))
                                             (begin
                                              (set!
                                               @Object_prototype
                                               (update-field (deref @Object_prototype)
                                                "toString"
                                                (alloc (object ("$code" (lambda (this arguments)
                                                                         (let
                                                                          ()
                                                                          (string-+ "[object " (string-+ (get-field
                                                                                                          (deref this)
                                                                                                          "$class") "]")))))
                                                               ("arguments" null)
                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                               ("$proto" @Function_prototype)
                                                               ("length" 0.0)
                                                               ("$strRep" "function fromafunctionboject(){}")))))
                                              (begin
                                               (set!
                                                @Object_prototype
                                                (update-field (deref @Object_prototype)
                                                 "toLocaleString"
                                                 (alloc (object ("$code" (lambda (this arguments)
                                                                          (let
                                                                           ()
                                                                           (string-+ "[object " (string-+ (get-field
                                                                                                           (deref this)
                                                                                                           "$class") "]")))))
                                                                ("arguments" null)
                                                                ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                ("$proto" @Function_prototype)
                                                                ("length" 0.0)
                                                                ("$strRep" "function fromafunctionboject(){}")))))
                                               (begin
                                                (set!
                                                 @Object_prototype
                                                 (update-field (deref @Object_prototype)
                                                  "valueOf"
                                                  (alloc (object ("$code" (lambda (this arguments)
                                                                           (let
                                                                            ()
                                                                            this)))
                                                                 ("arguments" null)
                                                                 ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                 ("$proto" @Function_prototype)
                                                                 ("length" 0.0)
                                                                 ("$strRep" "function fromafunctionboject(){}")))))
                                                (begin
                                                 (set!
                                                  @Object_prototype
                                                  (update-field (deref @Object_prototype)
                                                   "hasOwnProperty"
                                                   (alloc (object ("$code" (lambda (this arguments)
                                                                            (let
                                                                             ((V (get-field
                                                                                  (deref (deref arguments))
                                                                                  "0")))
                                                                             (has-own-prop? (deref this) (let
                                                                                                          (($toStr V))
                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                           (prim->string $toStr)))))))
                                                                  ("arguments" null)
                                                                  ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                  ("$proto" @Function_prototype)
                                                                  ("length" 1.0)
                                                                  ("$strRep" "function fromafunctionboject(){}")))))
                                                 (begin
                                                  (set!
                                                   @Function_prototype
                                                   (update-field (deref @Function_prototype)
                                                    "$proto"
                                                    @Object_prototype))
                                                  (begin
                                                   (set!
                                                    @Function_prototype
                                                    (update-field (deref @Function_prototype)
                                                     "$class"
                                                     "Function"))
                                                   (begin
                                                    (set!
                                                     @Function_prototype
                                                     (update-field (deref @Function_prototype)
                                                      "$strRep"
                                                      "function () {\n}"))
                                                    (begin
                                                     (set!
                                                      @Function_prototype
                                                      (update-field (deref @Function_prototype)
                                                       "constructor"
                                                       undefined))
                                                     (begin
                                                      (set!
                                                       @Function_prototype
                                                       (update-field (deref @Function_prototype)
                                                        "toString"
                                                        (alloc (object ("$code" (lambda (this arguments)
                                                                                 (let
                                                                                  ()
                                                                                  (get-field
                                                                                   (deref this)
                                                                                   "$strRep"))))
                                                                       ("arguments" null)
                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                       ("$proto" @Function_prototype)
                                                                       ("length" 0.0)
                                                                       ("$strRep" "function fromafunctionboject(){}")))))
                                                      (begin
                                                       (set!
                                                        @Function_prototype
                                                        (update-field (deref @Function_prototype)
                                                         "length"
                                                         0.0))
                                                       (begin
                                                        (set!
                                                         @Function_prototype
                                                         (update-field (deref @Function_prototype)
                                                          "apply"
                                                          (alloc (object ("$code" (lambda (this arguments)
                                                                                   (let
                                                                                    ((thisArg (get-field
                                                                                               (deref (deref arguments))
                                                                                               "0"))
                                                                                     (argArray (get-field
                                                                                                (deref (deref arguments))
                                                                                                "1")))
                                                                                    (if (if (has-own-prop? (deref this) "$code")
                                                                                         #f
                                                                                         #t)
                                                                                     (throw ($makeException "TypeError" ":apply must have this as a function"))
                                                                                     (let
                                                                                      (($6
                                                                                        (if (let
                                                                                             (($or (=== thisArg null)))
                                                                                             (if $or
                                                                                              $or
                                                                                              (=== (typeof thisArg) "undefined")))
                                                                                         $global
                                                                                         thisArg)))
                                                                                      (let
                                                                                       (($7
                                                                                         (if (let
                                                                                              (($or (=== argArray null)))
                                                                                              (if $or
                                                                                               $or
                                                                                               (=== (typeof argArray) "undefined")))
                                                                                          (object ("length" 0.0)
                                                                                                  ("callee" this)
                                                                                                  ("$class" "Object")
                                                                                                  ("$proto" @Object_prototype)
                                                                                                  ("$isArgs" #t))
                                                                                          (if (if (if (=== (typeof argArray) "location")
                                                                                                   (let
                                                                                                    (($or (=== (get-field
                                                                                                                (deref argArray)
                                                                                                                "$class") "Array")))
                                                                                                    (if $or
                                                                                                     $or
                                                                                                     (=== (get-field
                                                                                                           (deref argArray)
                                                                                                           "$isArgs") #t)))
                                                                                                   #f)
                                                                                               #f
                                                                                               #t)
                                                                                           (throw ($makeException "TypeError" ":apply expects arguments or array"))
                                                                                           (let
                                                                                            (($8
                                                                                              (alloc 0.0))
                                                                                             ($9
                                                                                              (alloc (object ("length" 0.0)
                                                                                                             ("callee" this)
                                                                                                             ("$class" "Object")
                                                                                                             ("$proto" @Object_prototype)
                                                                                                             ("$isArgs" #t)))))
                                                                                            (begin
                                                                                             (begin
                                                                                              undefined
                                                                                              (label $break
                                                                                               (while
                                                                                                (< (deref $8) (get-field
                                                                                                               (deref argArray)
                                                                                                               "length"))
                                                                                                (begin
                                                                                                 (label $continue
                                                                                                  (begin
                                                                                                   (set!
                                                                                                    $9
                                                                                                    (update-field (deref $9)
                                                                                                     (prim->string (get-field
                                                                                                                    (deref $9)
                                                                                                                    "length"))
                                                                                                     (get-field
                                                                                                      (deref argArray)
                                                                                                      (prim->string (deref $8)))))
                                                                                                   (set!
                                                                                                    $9
                                                                                                    (update-field (deref $9)
                                                                                                     "length"
                                                                                                     (+ (get-field
                                                                                                         (deref $9)
                                                                                                         "length") 1.0)))))
                                                                                                 (set!
                                                                                                  $8
                                                                                                  (+ (deref $8) 1.0))))))
                                                                                             $9))))))
                                                                                       ((get-field
                                                                                         (deref this)
                                                                                         "$code") $6 (alloc $7))))))))
                                                                         ("arguments" null)
                                                                         ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                         ("$proto" @Function_prototype)
                                                                         ("length" 2.0)
                                                                         ("$strRep" "function fromafunctionboject(){}")))))
                                                        (let
                                                         (($Date.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                          ("$class" "Date")
                                                                                          ("$value" +nan.0)
                                                                                          ("constructor" undefined)
                                                                                          ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ()
                                                                                                                                "THIS IS A DATE")))
                                                                                                                     ("arguments" null)
                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                     ("length" 0.0)
                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("valueOf" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ()
                                                                                                                               (get-field
                                                                                                                                (deref this)
                                                                                                                                "$value"))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 0.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("toDateString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                   (let
                                                                                                                                    ()
                                                                                                                                    "dateString")))
                                                                                                                         ("arguments" null)
                                                                                                                         ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                         ("$proto" @Function_prototype)
                                                                                                                         ("length" 0.0)
                                                                                                                         ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("toTimeString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                   (let
                                                                                                                                    ()
                                                                                                                                    "timeString")))
                                                                                                                         ("arguments" null)
                                                                                                                         ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                         ("$proto" @Function_prototype)
                                                                                                                         ("length" 0.0)
                                                                                                                         ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("toLocaleString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                     (let
                                                                                                                                      ()
                                                                                                                                      "localeString")))
                                                                                                                           ("arguments" null)
                                                                                                                           ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                           ("$proto" @Function_prototype)
                                                                                                                           ("length" 0.0)
                                                                                                                           ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("toLocaleDateString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                         (let
                                                                                                                                          ()
                                                                                                                                          "localeDateString")))
                                                                                                                               ("arguments" null)
                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                               ("length" 0.0)
                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("toLocaleTimeString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                         (let
                                                                                                                                          ()
                                                                                                                                          "localeTimeString")))
                                                                                                                               ("arguments" null)
                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                               ("length" 0.0)
                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getTime" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ()
                                                                                                                               (if (if (=== (get-field
                                                                                                                                             (deref this)
                                                                                                                                             "$class") "Date")
                                                                                                                                    #f
                                                                                                                                    #t)
                                                                                                                                (throw ($makeException "TypeError" ":expected Date obj, got smth else"))
                                                                                                                                (get-field
                                                                                                                                 (deref this)
                                                                                                                                 "$value")))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 0.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getFullYear" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCFullYear" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                     (let
                                                                                                                                      ()
                                                                                                                                      (throw "DATE FUNCS NYI"))))
                                                                                                                           ("arguments" null)
                                                                                                                           ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                           ("$proto" @Function_prototype)
                                                                                                                           ("length" 0.0)
                                                                                                                           ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getMonth" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ()
                                                                                                                                (throw "DATE FUNCS NYI"))))
                                                                                                                     ("arguments" null)
                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                     ("length" 0.0)
                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCMonth" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getDate" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ()
                                                                                                                               (throw "DATE FUNCS NYI"))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 0.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCDate" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (throw "DATE FUNCS NYI"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getDay" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                             (let
                                                                                                                              ()
                                                                                                                              (throw "DATE FUNCS NYI"))))
                                                                                                                   ("arguments" null)
                                                                                                                   ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                   ("$proto" @Function_prototype)
                                                                                                                   ("length" 0.0)
                                                                                                                   ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCDay" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                (let
                                                                                                                                 ()
                                                                                                                                 (throw "DATE FUNCS NYI"))))
                                                                                                                      ("arguments" null)
                                                                                                                      ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                      ("$proto" @Function_prototype)
                                                                                                                      ("length" 0.0)
                                                                                                                      ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getHours" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ()
                                                                                                                                (throw "DATE FUNCS NYI"))))
                                                                                                                     ("arguments" null)
                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                     ("length" 0.0)
                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCHours" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getMinutes" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (throw "DATE FUNCS NYI"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCMinutes" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ()
                                                                                                                                     (throw "DATE FUNCS NYI"))))
                                                                                                                          ("arguments" null)
                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                          ("length" 0.0)
                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getSeconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (throw "DATE FUNCS NYI"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCSeconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ()
                                                                                                                                     (throw "DATE FUNCS NYI"))))
                                                                                                                          ("arguments" null)
                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                          ("length" 0.0)
                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getMilliseconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                      (let
                                                                                                                                       ()
                                                                                                                                       (throw "DATE FUNCS NYI"))))
                                                                                                                            ("arguments" null)
                                                                                                                            ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                            ("$proto" @Function_prototype)
                                                                                                                            ("length" 0.0)
                                                                                                                            ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getUTCMilliseconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                         (let
                                                                                                                                          ()
                                                                                                                                          (throw "DATE FUNCS NYI"))))
                                                                                                                               ("arguments" null)
                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                               ("length" 0.0)
                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("getTimezoneOffset" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                        (let
                                                                                                                                         ()
                                                                                                                                         (throw "DATE FUNCS NYI"))))
                                                                                                                              ("arguments" null)
                                                                                                                              ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                              ("$proto" @Function_prototype)
                                                                                                                              ("length" 0.0)
                                                                                                                              ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setTime" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ()
                                                                                                                               (throw "DATE FUNCS NYI"))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 0.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setMilliseconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                      (let
                                                                                                                                       ()
                                                                                                                                       (throw "DATE FUNCS NYI"))))
                                                                                                                            ("arguments" null)
                                                                                                                            ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                            ("$proto" @Function_prototype)
                                                                                                                            ("length" 0.0)
                                                                                                                            ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCMilliseconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                         (let
                                                                                                                                          ()
                                                                                                                                          (throw "DATE FUNCS NYI"))))
                                                                                                                               ("arguments" null)
                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                               ("length" 0.0)
                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setSeconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (throw "DATE FUNCS NYI"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCSeconds" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ()
                                                                                                                                     (throw "DATE FUNCS NYI"))))
                                                                                                                          ("arguments" null)
                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                          ("length" 0.0)
                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setMinutes" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (throw "DATE FUNCS NYI"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCMinutes" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ()
                                                                                                                                     (throw "DATE FUNCS NYI"))))
                                                                                                                          ("arguments" null)
                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                          ("length" 0.0)
                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setHours" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ()
                                                                                                                                (throw "DATE FUNCS NYI"))))
                                                                                                                     ("arguments" null)
                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                     ("length" 0.0)
                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCHours" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setDate" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ()
                                                                                                                               (throw "DATE FUNCS NYI"))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 0.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCDate" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (throw "DATE FUNCS NYI"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setMonth" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ()
                                                                                                                                (throw "DATE FUNCS NYI"))))
                                                                                                                     ("arguments" null)
                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                     ("length" 0.0)
                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCMonth" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setFullYear" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("setUTCFullYear" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                     (let
                                                                                                                                      ()
                                                                                                                                      (throw "DATE FUNCS NYI"))))
                                                                                                                           ("arguments" null)
                                                                                                                           ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                           ("$proto" @Function_prototype)
                                                                                                                           ("length" 0.0)
                                                                                                                           ("$strRep" "function fromafunctionboject(){}"))))
                                                                                          ("toUTCString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (throw "DATE FUNCS NYI"))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))))))
                                                         (let
                                                          (($Number.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                             ("$class" "Number")
                                                                                             ("$value" 0.0)
                                                                                             ("constructor" undefined)
                                                                                             ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ((radix (get-field
                                                                                                                                            (deref (deref arguments))
                                                                                                                                            "0")))
                                                                                                                                   (if (if (let
                                                                                                                                            (($or (=== radix undefined)))
                                                                                                                                            (if $or
                                                                                                                                             $or
                                                                                                                                             (=== radix 10.0)))
                                                                                                                                        #f
                                                                                                                                        #t)
                                                                                                                                    (throw "num toStr for non-10 radix NYI")
                                                                                                                                    (prim->string (get-field
                                                                                                                                                   (deref this)
                                                                                                                                                   "$value"))))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 1.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("toLocaleString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                        (let
                                                                                                                                         ()
                                                                                                                                         (prim->string (get-field
                                                                                                                                                        (deref this)
                                                                                                                                                        "$value")))))
                                                                                                                              ("arguments" null)
                                                                                                                              ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                              ("$proto" @Function_prototype)
                                                                                                                              ("length" 0.0)
                                                                                                                              ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("valueOf" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  (get-field
                                                                                                                                   (deref this)
                                                                                                                                   "$value"))))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("toFixed" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  "Number.toFixed")))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("toExponential" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                       (let
                                                                                                                                        ((fracDigs (get-field
                                                                                                                                                    (deref (deref arguments))
                                                                                                                                                    "0")))
                                                                                                                                        "Number.toExp")))
                                                                                                                             ("arguments" null)
                                                                                                                             ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                             ("$proto" @Function_prototype)
                                                                                                                             ("length" 1.0)
                                                                                                                             ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("toPrecision" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                     (let
                                                                                                                                      ((prec (get-field
                                                                                                                                              (deref (deref arguments))
                                                                                                                                              "0")))
                                                                                                                                      "Number.toPrecision")))
                                                                                                                           ("arguments" null)
                                                                                                                           ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                           ("$proto" @Function_prototype)
                                                                                                                           ("length" 1.0)
                                                                                                                           ("$strRep" "function fromafunctionboject(){}"))))))))
                                                          (let
                                                           (($Array.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                             ("$class" "Object")
                                                                                             ("length" 0.0)
                                                                                             ("constructor" undefined)
                                                                                             ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ()
                                                                                                                                   (if (if (=== (get-field
                                                                                                                                                 (deref this)
                                                                                                                                                 "$class") "Array")
                                                                                                                                        #f
                                                                                                                                        #t)
                                                                                                                                    (throw ($makeException "TypeError" ":expected Array obj, got smth else"))
                                                                                                                                    (let
                                                                                                                                     (($10
                                                                                                                                       (get-field
                                                                                                                                        (deref this)
                                                                                                                                        "join")))
                                                                                                                                     ((get-field
                                                                                                                                       (deref $10)
                                                                                                                                       "$code") this (alloc (alloc (object ("length" 0.0)
                                                                                                                                                                           ("callee" $10)
                                                                                                                                                                           ("$class" "Object")
                                                                                                                                                                           ("$proto" @Object_prototype)
                                                                                                                                                                           ("$isArgs" #t))))))))))
                                                                                                                        ("arguments" null)
                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                        ("length" 0.0)
                                                                                                                        ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("concat" "TODO: Array.prototype.concat")
                                                                                             ("pop" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                             (let
                                                                                                                              ()
                                                                                                                              (if (=== (get-field
                                                                                                                                        (deref this)
                                                                                                                                        "length") 0.0)
                                                                                                                               undefined
                                                                                                                               (let
                                                                                                                                (($newlen (+ (prim->number (get-field
                                                                                                                                                            (deref this)
                                                                                                                                                            "length")) -1.0)))
                                                                                                                                (let
                                                                                                                                 (($result (get-field
                                                                                                                                            (deref this)
                                                                                                                                            (prim->string $newlen))))
                                                                                                                                 (begin
                                                                                                                                  (set!
                                                                                                                                   this
                                                                                                                                   (update-field (deref this)
                                                                                                                                    "length"
                                                                                                                                    $newlen))
                                                                                                                                  (begin
                                                                                                                                   (set!
                                                                                                                                    this
                                                                                                                                    (delete-field (deref this)
                                                                                                                                     (prim->string $newlen)))
                                                                                                                                   $result))))))))
                                                                                                                   ("arguments" null)
                                                                                                                   ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                   ("$proto" @Function_prototype)
                                                                                                                   ("length" 0.0)
                                                                                                                   ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("push" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ()
                                                                                                                               (let
                                                                                                                                (($i (alloc 0.0)))
                                                                                                                                (begin
                                                                                                                                 (begin
                                                                                                                                  undefined
                                                                                                                                  (label $break
                                                                                                                                   (while
                                                                                                                                    (< (deref $i) (get-field
                                                                                                                                                   (deref (deref arguments))
                                                                                                                                                   "length"))
                                                                                                                                    (begin
                                                                                                                                     (label $continue
                                                                                                                                      (begin
                                                                                                                                       (set!
                                                                                                                                        this
                                                                                                                                        (update-field (deref this)
                                                                                                                                         (prim->string (get-field
                                                                                                                                                        (deref this)
                                                                                                                                                        "length"))
                                                                                                                                         (get-field
                                                                                                                                          (deref (deref arguments))
                                                                                                                                          (prim->string (deref $i)))))
                                                                                                                                       (set!
                                                                                                                                        this
                                                                                                                                        (update-field (deref this)
                                                                                                                                         "length"
                                                                                                                                         (+ (get-field
                                                                                                                                             (deref this)
                                                                                                                                             "length") 1.0)))))
                                                                                                                                     (set!
                                                                                                                                      $i
                                                                                                                                      (+ (deref $i) 1.0))))))
                                                                                                                                 (get-field
                                                                                                                                  (deref this)
                                                                                                                                  "length"))))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 0.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))
                                                                                             ("reverse" "TODO: Array.prototype.reverse")
                                                                                             ("shift" "TODO: Array.prototype.shift")
                                                                                             ("slice" "TODO: Array.prototype.slice")
                                                                                             ("splice" "TODO: Array.prototype.splice")
                                                                                             ("unshift" "TODO: Array.prototype.unshift")))))
                                                           (let
                                                            (($Boolean.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                ("$class" "Boolean")
                                                                                                ("$value" #f)
                                                                                                ("constructor" undefined)
                                                                                                ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                     (let
                                                                                                                                      ()
                                                                                                                                      (if (if (=== (get-field
                                                                                                                                                    (deref this)
                                                                                                                                                    "$class") "Boolean")
                                                                                                                                           #f
                                                                                                                                           #t)
                                                                                                                                       (throw ($makeException "TypeError" ":expected Boolean obj, got smth else"))
                                                                                                                                       (if (get-field
                                                                                                                                            (deref this)
                                                                                                                                            "$value")
                                                                                                                                        "true"
                                                                                                                                        "false")))))
                                                                                                                           ("arguments" null)
                                                                                                                           ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                           ("$proto" @Function_prototype)
                                                                                                                           ("length" 0.0)
                                                                                                                           ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                ("valueOf" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ()
                                                                                                                                     (if (if (=== (get-field
                                                                                                                                                   (deref this)
                                                                                                                                                   "$class") "Boolean")
                                                                                                                                          #f
                                                                                                                                          #t)
                                                                                                                                      (throw ($makeException "TypeError" ":expected Boolean obj, got smth else"))
                                                                                                                                      (get-field
                                                                                                                                       (deref this)
                                                                                                                                       "$value")))))
                                                                                                                          ("arguments" null)
                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                          ("length" 0.0)
                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))))))
                                                            (let
                                                             (($Error.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                               ("$class" "Error")
                                                                                               ("constructor" undefined)
                                                                                               ("name" "Error")
                                                                                               ("message" "Error error")
                                                                                               ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ()
                                                                                                                                     (string-+ (let
                                                                                                                                                (($toStr (get-field
                                                                                                                                                          (deref this)
                                                                                                                                                          "name")))
                                                                                                                                                (if (=== (typeof $toStr) "location")
                                                                                                                                                 (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                 (prim->string $toStr))) (let
                                                                                                                                                                          (($toStr (get-field
                                                                                                                                                                                    (deref this)
                                                                                                                                                                                    "message")))
                                                                                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                           (prim->string $toStr)))))))
                                                                                                                          ("arguments" null)
                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                          ("length" 0.0)
                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))))))
                                                             (let
                                                              (($ConversionError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                          ("$class" "Error")
                                                                                                          ("constructor" undefined)
                                                                                                          ("name" "ConversionError")
                                                                                                          ("message" "ConversionError error")
                                                                                                          ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                               (let
                                                                                                                                                ()
                                                                                                                                                (string-+ (let
                                                                                                                                                           (($toStr (get-field
                                                                                                                                                                     (deref this)
                                                                                                                                                                     "name")))
                                                                                                                                                           (if (=== (typeof $toStr) "location")
                                                                                                                                                            (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                            (prim->string $toStr))) (let
                                                                                                                                                                                     (($toStr (get-field
                                                                                                                                                                                               (deref this)
                                                                                                                                                                                               "message")))
                                                                                                                                                                                     (if (=== (typeof $toStr) "location")
                                                                                                                                                                                      (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                      (prim->string $toStr)))))))
                                                                                                                                     ("arguments" null)
                                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                                     ("length" 0.0)
                                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))))))
                                                              (let
                                                               (($EvalError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                     ("$class" "Error")
                                                                                                     ("constructor" undefined)
                                                                                                     ("name" "EvalError")
                                                                                                     ("message" "EvalError error")
                                                                                                     ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                          (let
                                                                                                                                           ()
                                                                                                                                           (string-+ (let
                                                                                                                                                      (($toStr (get-field
                                                                                                                                                                (deref this)
                                                                                                                                                                "name")))
                                                                                                                                                      (if (=== (typeof $toStr) "location")
                                                                                                                                                       (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                       (prim->string $toStr))) (let
                                                                                                                                                                                (($toStr (get-field
                                                                                                                                                                                          (deref this)
                                                                                                                                                                                          "message")))
                                                                                                                                                                                (if (=== (typeof $toStr) "location")
                                                                                                                                                                                 (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                 (prim->string $toStr)))))))
                                                                                                                                ("arguments" null)
                                                                                                                                ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                ("$proto" @Function_prototype)
                                                                                                                                ("length" 0.0)
                                                                                                                                ("$strRep" "function fromafunctionboject(){}"))))))))
                                                               (let
                                                                (($RangeError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                       ("$class" "Error")
                                                                                                       ("constructor" undefined)
                                                                                                       ("name" "RangeError")
                                                                                                       ("message" "RangeError error")
                                                                                                       ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                            (let
                                                                                                                                             ()
                                                                                                                                             (string-+ (let
                                                                                                                                                        (($toStr (get-field
                                                                                                                                                                  (deref this)
                                                                                                                                                                  "name")))
                                                                                                                                                        (if (=== (typeof $toStr) "location")
                                                                                                                                                         (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                         (prim->string $toStr))) (let
                                                                                                                                                                                  (($toStr (get-field
                                                                                                                                                                                            (deref this)
                                                                                                                                                                                            "message")))
                                                                                                                                                                                  (if (=== (typeof $toStr) "location")
                                                                                                                                                                                   (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                   (prim->string $toStr)))))))
                                                                                                                                  ("arguments" null)
                                                                                                                                  ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                  ("$proto" @Function_prototype)
                                                                                                                                  ("length" 0.0)
                                                                                                                                  ("$strRep" "function fromafunctionboject(){}"))))))))
                                                                (let
                                                                 (($ReferenceError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                            ("$class" "Error")
                                                                                                            ("constructor" undefined)
                                                                                                            ("name" "ReferenceError")
                                                                                                            ("message" "ReferenceError error")
                                                                                                            ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                 (let
                                                                                                                                                  ()
                                                                                                                                                  (string-+ (let
                                                                                                                                                             (($toStr (get-field
                                                                                                                                                                       (deref this)
                                                                                                                                                                       "name")))
                                                                                                                                                             (if (=== (typeof $toStr) "location")
                                                                                                                                                              (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                              (prim->string $toStr))) (let
                                                                                                                                                                                       (($toStr (get-field
                                                                                                                                                                                                 (deref this)
                                                                                                                                                                                                 "message")))
                                                                                                                                                                                       (if (=== (typeof $toStr) "location")
                                                                                                                                                                                        (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                        (prim->string $toStr)))))))
                                                                                                                                       ("arguments" null)
                                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                                       ("length" 0.0)
                                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))))))
                                                                 (let
                                                                  (($SyntaxError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                          ("$class" "Error")
                                                                                                          ("constructor" undefined)
                                                                                                          ("name" "SyntaxError")
                                                                                                          ("message" "SyntaxError error")
                                                                                                          ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                               (let
                                                                                                                                                ()
                                                                                                                                                (string-+ (let
                                                                                                                                                           (($toStr (get-field
                                                                                                                                                                     (deref this)
                                                                                                                                                                     "name")))
                                                                                                                                                           (if (=== (typeof $toStr) "location")
                                                                                                                                                            (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                            (prim->string $toStr))) (let
                                                                                                                                                                                     (($toStr (get-field
                                                                                                                                                                                               (deref this)
                                                                                                                                                                                               "message")))
                                                                                                                                                                                     (if (=== (typeof $toStr) "location")
                                                                                                                                                                                      (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                      (prim->string $toStr)))))))
                                                                                                                                     ("arguments" null)
                                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                                     ("length" 0.0)
                                                                                                                                     ("$strRep" "function fromafunctionboject(){}"))))))))
                                                                  (let
                                                                   (($TypeError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                         ("$class" "Error")
                                                                                                         ("constructor" undefined)
                                                                                                         ("name" "TypeError")
                                                                                                         ("message" "TypeError error")
                                                                                                         ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                              (let
                                                                                                                                               ()
                                                                                                                                               (string-+ (let
                                                                                                                                                          (($toStr (get-field
                                                                                                                                                                    (deref this)
                                                                                                                                                                    "name")))
                                                                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                           (prim->string $toStr))) (let
                                                                                                                                                                                    (($toStr (get-field
                                                                                                                                                                                              (deref this)
                                                                                                                                                                                              "message")))
                                                                                                                                                                                    (if (=== (typeof $toStr) "location")
                                                                                                                                                                                     (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                     (prim->string $toStr)))))))
                                                                                                                                    ("arguments" null)
                                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                                    ("length" 0.0)
                                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))))))
                                                                   (let
                                                                    (($URIError.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                         ("$class" "Error")
                                                                                                         ("constructor" undefined)
                                                                                                         ("name" "URIError")
                                                                                                         ("message" "URIError error")
                                                                                                         ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                              (let
                                                                                                                                               ()
                                                                                                                                               (string-+ (let
                                                                                                                                                          (($toStr (get-field
                                                                                                                                                                    (deref this)
                                                                                                                                                                    "name")))
                                                                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                           (prim->string $toStr))) (let
                                                                                                                                                                                    (($toStr (get-field
                                                                                                                                                                                              (deref this)
                                                                                                                                                                                              "message")))
                                                                                                                                                                                    (if (=== (typeof $toStr) "location")
                                                                                                                                                                                     (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                     (prim->string $toStr)))))))
                                                                                                                                    ("arguments" null)
                                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                                    ("length" 0.0)
                                                                                                                                    ("$strRep" "function fromafunctionboject(){}"))))))))
                                                                    (let
                                                                     ((Object (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                    ("prototype" @Object_prototype)
                                                                                                    ("length" 1.0)
                                                                                                    ("$code" (lambda (this arguments)
                                                                                                              (let
                                                                                                               ((value (get-field
                                                                                                                        (deref (deref arguments))
                                                                                                                        "0")))
                                                                                                               (if (if (=== value undefined)
                                                                                                                    #t
                                                                                                                    (=== value null))
                                                                                                                (alloc (object ("$class" "Object")
                                                                                                                               ("$proto" @Object_prototype)))
                                                                                                                (@toObject value))))))))))
                                                                     (let
                                                                      ((Function (alloc (alloc (object ("$code" (lambda (this arguments)
                                                                                                                 (let
                                                                                                                  ()
                                                                                                                  (let
                                                                                                                   (($numArgs (get-field
                                                                                                                               (deref (deref arguments))
                                                                                                                               "length")))
                                                                                                                   (if (=== $numArgs 0.0)
                                                                                                                    (begin
                                                                                                                     (set!
                                                                                                                      this
                                                                                                                      (update-field (deref this)
                                                                                                                       "$proto"
                                                                                                                       @Function_prototype))
                                                                                                                     (begin
                                                                                                                      (set!
                                                                                                                       this
                                                                                                                       (update-field (deref this)
                                                                                                                        "$class"
                                                                                                                        "Function"))
                                                                                                                      (begin
                                                                                                                       (set!
                                                                                                                        this
                                                                                                                        (update-field (deref this)
                                                                                                                         "length"
                                                                                                                         0.0))
                                                                                                                       undefined)))
                                                                                                                    eval-semantic-bomb)))))
                                                                                                       ("$proto" @Function_prototype)
                                                                                                       ("$class" "Function")
                                                                                                       ("$strRep" "function Function() {\n    [native code]\n}")
                                                                                                       ("prototype" @Function_prototype)
                                                                                                       ("length" 1.0))))))
                                                                      (let
                                                                       ((Array (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                     ("length" 1.0)
                                                                                                     ("prototype" $Array.prototype)
                                                                                                     ("$strRep" "function Array() {\n    [native code]\n}")
                                                                                                     ("$code" (lambda (this arguments)
                                                                                                               (let
                                                                                                                (($arg0 (get-field
                                                                                                                         (deref (deref arguments))
                                                                                                                         "0")))
                                                                                                                (let
                                                                                                                 (($numArgs (get-field
                                                                                                                             (deref (deref arguments))
                                                                                                                             "length")))
                                                                                                                 (if (if (=== (typeof (get-field
                                                                                                                                       (deref this)
                                                                                                                                       "$constructing")) "undefined")
                                                                                                                      #f
                                                                                                                      #t)
                                                                                                                  (if (if (=== $numArgs 1.0)
                                                                                                                       (=== (typeof $arg0) "number")
                                                                                                                       #f)
                                                                                                                   (if (=== (to-uint-32 $arg0) $arg0)
                                                                                                                    (begin
                                                                                                                     (set!
                                                                                                                      this
                                                                                                                      (update-field (deref this)
                                                                                                                       "$class"
                                                                                                                       "Array"))
                                                                                                                     (begin
                                                                                                                      (set!
                                                                                                                       this
                                                                                                                       (update-field (deref this)
                                                                                                                        "$proto"
                                                                                                                        $Array.prototype))
                                                                                                                      (begin
                                                                                                                       (set!
                                                                                                                        this
                                                                                                                        (update-field (deref this)
                                                                                                                         "length"
                                                                                                                         $arg0))
                                                                                                                       undefined)))
                                                                                                                    (throw ($makeException "RangeError" ":invalid len to new Array()")))
                                                                                                                   (begin
                                                                                                                    (set!
                                                                                                                     this
                                                                                                                     (update-field (deref this)
                                                                                                                      "$class"
                                                                                                                      "Array"))
                                                                                                                    (begin
                                                                                                                     (set!
                                                                                                                      this
                                                                                                                      (update-field (deref this)
                                                                                                                       "$proto"
                                                                                                                       $Array.prototype))
                                                                                                                     (begin
                                                                                                                      (set!
                                                                                                                       this
                                                                                                                       (update-field (deref this)
                                                                                                                        "length"
                                                                                                                        $numArgs))
                                                                                                                      (let
                                                                                                                       (($i (alloc 0.0)))
                                                                                                                       (while
                                                                                                                        (< (deref $i) $numArgs)
                                                                                                                        (begin
                                                                                                                         (set!
                                                                                                                          this
                                                                                                                          (update-field (deref this)
                                                                                                                           (prim->string (deref $i))
                                                                                                                           (get-field
                                                                                                                            (deref (deref arguments))
                                                                                                                            (prim->string (deref $i)))))
                                                                                                                         (set!
                                                                                                                          $i
                                                                                                                          (+ (deref $i) 1.0)))))))))
                                                                                                                  (@newDirect (get-field
                                                                                                                               (deref $global)
                                                                                                                               "Array") arguments)))))))))))
                                                                       (let
                                                                        (($RegExp.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                           ("$class" "Object")
                                                                                                           ("length" 0.0)
                                                                                                           ("constructor" undefined)
                                                                                                           ("exec" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                            (let
                                                                                                                                             (($$string (get-field
                                                                                                                                                         (deref (deref arguments))
                                                                                                                                                         "0")))
                                                                                                                                             (if (if (=== (get-field
                                                                                                                                                           (deref this)
                                                                                                                                                           "$class") "RegExp")
                                                                                                                                                  #f
                                                                                                                                                  #t)
                                                                                                                                              (throw ($makeException "TypeError" ":expected RegExp obj, got smth else"))
                                                                                                                                              (if (let
                                                                                                                                                   (($or (get-field
                                                                                                                                                          (deref this)
                                                                                                                                                          "global")))
                                                                                                                                                   (if $or
                                                                                                                                                    $or
                                                                                                                                                    (get-field
                                                                                                                                                     (deref this)
                                                                                                                                                     "ignoreCase")))
                                                                                                                                               (throw "regexp not fully impl yet")
                                                                                                                                               (let
                                                                                                                                                (($11
                                                                                                                                                  (let
                                                                                                                                                   (($toStr $$string))
                                                                                                                                                   (if (=== (typeof $toStr) "location")
                                                                                                                                                    (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                    (prim->string $toStr)))))
                                                                                                                                                (let
                                                                                                                                                 (($12
                                                                                                                                                   (regexp-match $11 (get-field
                                                                                                                                                                      (deref this)
                                                                                                                                                                      "$regexpPattern"))))
                                                                                                                                                 (if (=== (typeof $12) "undefined")
                                                                                                                                                  null
                                                                                                                                                  (@newDirect (deref Array) (alloc (alloc $12)))))))))))
                                                                                                                                  ("arguments" null)
                                                                                                                                  ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                  ("$proto" @Function_prototype)
                                                                                                                                  ("length" 1.0)
                                                                                                                                  ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                           ("test" "TODO: RegExp.prototype.test")))))
                                                                        (let
                                                                         ((RegExp (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                        ("prototype" $RegExp.prototype)
                                                                                                        ("length" 2.0)
                                                                                                        ("$code" (lambda (this arguments)
                                                                                                                  (let
                                                                                                                   (($pattern (get-field
                                                                                                                               (deref (deref arguments))
                                                                                                                               "0"))
                                                                                                                    ($flags (get-field
                                                                                                                             (deref (deref arguments))
                                                                                                                             "1")))
                                                                                                                   (let
                                                                                                                    (($P (if (@isRefComb (lambda (@x)
                                                                                                                                          (=== (typeof @x) "object")) $pattern)
                                                                                                                          (if (if (=== (typeof $flags) "undefined")
                                                                                                                               #f
                                                                                                                               #t)
                                                                                                                           (throw ($makeException "TypeError" ":given regexp and flags in constr"))
                                                                                                                           (get-field
                                                                                                                            (deref $pattern)
                                                                                                                            "$regexpPattern"))
                                                                                                                          (if (=== (typeof $pattern) "undefined")
                                                                                                                           ""
                                                                                                                           (let
                                                                                                                            (($toStr $pattern))
                                                                                                                            (if (=== (typeof $toStr) "location")
                                                                                                                             (prim->string (@toPrimitive_Number $toStr))
                                                                                                                             (prim->string $toStr))))))
                                                                                                                     ($F (if (@isRefComb (lambda (@x)
                                                                                                                                          (=== (typeof @x) "object")) $pattern)
                                                                                                                          (get-field
                                                                                                                           (deref $pattern)
                                                                                                                           "$regexpFlags")
                                                                                                                          (if (=== (typeof $flags) "undefined")
                                                                                                                           ""
                                                                                                                           (let
                                                                                                                            (($toStr $flags))
                                                                                                                            (if (=== (typeof $toStr) "location")
                                                                                                                             (prim->string (@toPrimitive_Number $toStr))
                                                                                                                             (prim->string $toStr)))))))
                                                                                                                    (begin
                                                                                                                     (set!
                                                                                                                      this
                                                                                                                      (update-field (deref this)
                                                                                                                       "global"
                                                                                                                       (str-contains $F "g")))
                                                                                                                     (begin
                                                                                                                      (set!
                                                                                                                       this
                                                                                                                       (update-field (deref this)
                                                                                                                        "ignoreCase"
                                                                                                                        (str-contains $F "i")))
                                                                                                                      (begin
                                                                                                                       (set!
                                                                                                                        this
                                                                                                                        (update-field (deref this)
                                                                                                                         "multiline"
                                                                                                                         (str-contains $F "m")))
                                                                                                                       (begin
                                                                                                                        (set!
                                                                                                                         this
                                                                                                                         (update-field (deref this)
                                                                                                                          "$regexpPattern"
                                                                                                                          $P))
                                                                                                                        (begin
                                                                                                                         (set!
                                                                                                                          this
                                                                                                                          (update-field (deref this)
                                                                                                                           "$regexpFlags"
                                                                                                                           $F))
                                                                                                                         (begin
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "source"
                                                                                                                            $P))
                                                                                                                          (begin
                                                                                                                           (set!
                                                                                                                            this
                                                                                                                            (update-field (deref this)
                                                                                                                             "lastIndex"
                                                                                                                             0.0))
                                                                                                                           (begin
                                                                                                                            (set!
                                                                                                                             this
                                                                                                                             (update-field (deref this)
                                                                                                                              "$proto"
                                                                                                                              $RegExp.prototype))
                                                                                                                            (begin
                                                                                                                             (set!
                                                                                                                              this
                                                                                                                              (update-field (deref this)
                                                                                                                               "$class"
                                                                                                                               "RegExp"))
                                                                                                                             undefined))))))))))))))))))
                                                                         (let
                                                                          ((Date (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                       ("$class" "Function")
                                                                                                       ("$strRep" "function Date() {\n    [native code]\n}")
                                                                                                       ("length" 7.0)
                                                                                                       ("prototype" $Date.prototype)
                                                                                                       ("$code" (lambda (this arguments)
                                                                                                                 (let
                                                                                                                  ((y (get-field
                                                                                                                       (deref (deref arguments))
                                                                                                                       "0"))
                                                                                                                   (m (get-field
                                                                                                                       (deref (deref arguments))
                                                                                                                       "1"))
                                                                                                                   (d (get-field
                                                                                                                       (deref (deref arguments))
                                                                                                                       "2"))
                                                                                                                   (h (get-field
                                                                                                                       (deref (deref arguments))
                                                                                                                       "3"))
                                                                                                                   (min (get-field
                                                                                                                         (deref (deref arguments))
                                                                                                                         "4"))
                                                                                                                   (s (get-field
                                                                                                                       (deref (deref arguments))
                                                                                                                       "5"))
                                                                                                                   (ms (get-field
                                                                                                                        (deref (deref arguments))
                                                                                                                        "6")))
                                                                                                                  (let
                                                                                                                   (($numArgs (get-field
                                                                                                                               (deref (deref arguments))
                                                                                                                               "length")))
                                                                                                                   (begin
                                                                                                                    (begin
                                                                                                                     (set!
                                                                                                                      this
                                                                                                                      (update-field (deref this)
                                                                                                                       "$class"
                                                                                                                       "Date"))
                                                                                                                     (begin
                                                                                                                      (set!
                                                                                                                       this
                                                                                                                       (update-field (deref this)
                                                                                                                        "$proto"
                                                                                                                        $Date.prototype))
                                                                                                                      (set!
                                                                                                                       this
                                                                                                                       (update-field (deref this)
                                                                                                                        "$value"
                                                                                                                        "TODO:Dateimpl"))))
                                                                                                                    undefined)))))
                                                                                                       ("parse" "TODO: Date.parse")
                                                                                                       ("UTC" "TODO: Date.UTC"))))))
                                                                          (let
                                                                           ((Number (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                          ("$class" "Function")
                                                                                                          ("$strRep" "function Number() {\n    [native code]\n}")
                                                                                                          ("length" 1.0)
                                                                                                          ("prototype" $Number.prototype)
                                                                                                          ("$code" (lambda (this arguments)
                                                                                                                    (let
                                                                                                                     (($value (get-field
                                                                                                                               (deref (deref arguments))
                                                                                                                               "0")))
                                                                                                                     (let
                                                                                                                      (($numArgs (get-field
                                                                                                                                  (deref (deref arguments))
                                                                                                                                  "length")))
                                                                                                                      (begin
                                                                                                                       (if (=== $numArgs 0.0)
                                                                                                                        (begin
                                                                                                                         (set!
                                                                                                                          this
                                                                                                                          (update-field (deref this)
                                                                                                                           "$class"
                                                                                                                           "Number"))
                                                                                                                         (begin
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$proto"
                                                                                                                            $Number.prototype))
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$value"
                                                                                                                            0.0))))
                                                                                                                        (begin
                                                                                                                         (set!
                                                                                                                          this
                                                                                                                          (update-field (deref this)
                                                                                                                           "$class"
                                                                                                                           "Number"))
                                                                                                                         (begin
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$proto"
                                                                                                                            $Number.prototype))
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$value"
                                                                                                                            (@toNumber $value))))))
                                                                                                                       undefined)))))
                                                                                                          ("MAX_VALUE" +inf.0)
                                                                                                          ("MIN_VALUE" 0.0)
                                                                                                          ("NaN" +nan.0)
                                                                                                          ("NEGATIVE_INFINITY" -inf.0)
                                                                                                          ("POSITIVE_INFINITY" +inf.0)
                                                                                                          ("parse" "TODO: Date.parse")
                                                                                                          ("UTC" "TODO: Date.UTC"))))))
                                                                           (let
                                                                            (($String.prototype (alloc (object ("$proto" @Object_prototype)
                                                                                                               ("$class" "String")
                                                                                                               ("$value" "")
                                                                                                               ("constructor" undefined)
                                                                                                               ("toString" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                    (let
                                                                                                                                                     ()
                                                                                                                                                     (if (if (=== (get-field
                                                                                                                                                                   (deref this)
                                                                                                                                                                   "$class") "String")
                                                                                                                                                          #f
                                                                                                                                                          #t)
                                                                                                                                                      (throw ($makeException "TypeError" ":'this' from String's toString not str"))
                                                                                                                                                      (get-field
                                                                                                                                                       (deref this)
                                                                                                                                                       "$value")))))
                                                                                                                                          ("arguments" null)
                                                                                                                                          ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                          ("$proto" @Function_prototype)
                                                                                                                                          ("length" 0.0)
                                                                                                                                          ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                               ("valueOf" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                   (let
                                                                                                                                                    ()
                                                                                                                                                    (if (if (=== (get-field
                                                                                                                                                                  (deref this)
                                                                                                                                                                  "$class") "String")
                                                                                                                                                         #f
                                                                                                                                                         #t)
                                                                                                                                                     (throw ($makeException "TypeError" ":'this' from String's toString not str"))
                                                                                                                                                     (get-field
                                                                                                                                                      (deref this)
                                                                                                                                                      "$value")))))
                                                                                                                                         ("arguments" null)
                                                                                                                                         ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                         ("$proto" @Function_prototype)
                                                                                                                                         ("length" 0.0)
                                                                                                                                         ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                               ("charAt" "TODO: String.prototype.charAt")
                                                                                                               ("charCodeAt" "TODO: String.prototype.charCodeAt")
                                                                                                               ("concat" "TODO: String.prototype.concat")
                                                                                                               ("indexOf" "TODO: String.prototype.indexOf")
                                                                                                               ("lastIndexOf" "TODO: String.prototype.lastIndexOf")
                                                                                                               ("localeCompare" "TODO: String.prototype.localeCompare")
                                                                                                               ("match" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                 (let
                                                                                                                                                  ((regexp (get-field
                                                                                                                                                            (deref (deref arguments))
                                                                                                                                                            "0")))
                                                                                                                                                  (let
                                                                                                                                                   (($regexp (if (if (@isRefComb (lambda (@x)
                                                                                                                                                                                  (=== (typeof @x) "object")) regexp)
                                                                                                                                                                  (=== (get-field
                                                                                                                                                                        (deref regexp)
                                                                                                                                                                        "$class") "RegExp")
                                                                                                                                                                  #f)
                                                                                                                                                              regexp
                                                                                                                                                              (let
                                                                                                                                                               (($13
                                                                                                                                                                 (deref RegExp)))
                                                                                                                                                               (@newDirect $13 (alloc (alloc (object ("length" 1.0)
                                                                                                                                                                                                     ("callee" $13)
                                                                                                                                                                                                     ("$class" "Object")
                                                                                                                                                                                                     ("$proto" @Object_prototype)
                                                                                                                                                                                                     ("$isArgs" #t)
                                                                                                                                                                                                     ("0" regexp)))))))))
                                                                                                                                                   (let
                                                                                                                                                    (($this (let
                                                                                                                                                             (($toStr this))
                                                                                                                                                             (if (=== (typeof $toStr) "location")
                                                                                                                                                              (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                              (prim->string $toStr)))))
                                                                                                                                                    (if (prim->bool (get-field
                                                                                                                                                                     (deref $regexp)
                                                                                                                                                                     "global"))
                                                                                                                                                     (throw "String.match w/ global #t NYI")
                                                                                                                                                     (let
                                                                                                                                                      (($14
                                                                                                                                                        (get-field
                                                                                                                                                         (deref $regexp)
                                                                                                                                                         "exec")))
                                                                                                                                                      ((get-field
                                                                                                                                                        (deref $14)
                                                                                                                                                        "$code") $regexp (alloc (alloc (object ("length" 1.0)
                                                                                                                                                                                               ("callee" $14)
                                                                                                                                                                                               ("$class" "Object")
                                                                                                                                                                                               ("$proto" @Object_prototype)
                                                                                                                                                                                               ("$isArgs" #t)
                                                                                                                                                                                               ("0" $this))))))))))))
                                                                                                                                       ("arguments" null)
                                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                                       ("length" 1.0)
                                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                               ("replace" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                   (let
                                                                                                                                                    ()
                                                                                                                                                    (get-field
                                                                                                                                                     (deref this)
                                                                                                                                                     "$value"))))
                                                                                                                                         ("arguments" null)
                                                                                                                                         ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                         ("$proto" @Function_prototype)
                                                                                                                                         ("length" 0.0)
                                                                                                                                         ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                               ("search" "TODO: String.prototype.search")
                                                                                                               ("slice" "TODO: String.prototype.slice")
                                                                                                               ("split" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                 (let
                                                                                                                                                  ((separator (get-field
                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                               "0"))
                                                                                                                                                   (limit (get-field
                                                                                                                                                           (deref (deref arguments))
                                                                                                                                                           "1")))
                                                                                                                                                  (let
                                                                                                                                                   (($strThis (let
                                                                                                                                                               (($toStr this))
                                                                                                                                                               (if (=== (typeof $toStr) "location")
                                                                                                                                                                (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                (prim->string $toStr)))))
                                                                                                                                                   (if (if (=== (typeof separator) "object")
                                                                                                                                                        (=== (get-field
                                                                                                                                                              (deref separator)
                                                                                                                                                              "$class") "RegExp")
                                                                                                                                                        #f)
                                                                                                                                                    (@newDirect (deref Array) (alloc (alloc (str-split-regexp $strThis (get-field
                                                                                                                                                                                                                        (deref separator)
                                                                                                                                                                                                                        "$regexpPattern")))))
                                                                                                                                                    (@newDirect (deref Array) (alloc (alloc (str-split-strexp $strThis (let
                                                                                                                                                                                                                        (($toStr separator))
                                                                                                                                                                                                                        (if (=== (typeof $toStr) "location")
                                                                                                                                                                                                                         (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                                                         (prim->string $toStr))))))))))))
                                                                                                                                       ("arguments" null)
                                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                                       ("length" 2.0)
                                                                                                                                       ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                               ("substring" "TODO: String.prototype.substring")
                                                                                                               ("toLowerCase" "TODO: String.prototype.toLowerCase")
                                                                                                               ("toLocaleLowerCase" "TODO: String.prototype.toLocaleLowerCase")
                                                                                                               ("toUpperCase" "TODO: String.prototype.toUpperCase")
                                                                                                               ("toLocaleUpperCase" "TODO: String.prototype.toLocaleUpperCase")
                                                                                                               ("length" 0.0)))))
                                                                            (let
                                                                             ((String (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                            ("$class" "Function")
                                                                                                            ("$strRep" "function String() {\n    [native code]\n}")
                                                                                                            ("prototype" $String.prototype)
                                                                                                            ("fromCharCode" "TODO: String fromCharCode")
                                                                                                            ("length" 1.0)
                                                                                                            ("$code" (lambda (this arguments)
                                                                                                                      (let
                                                                                                                       (($value (get-field
                                                                                                                                 (deref (deref arguments))
                                                                                                                                 "0")))
                                                                                                                       (if (if (=== (typeof (get-field
                                                                                                                                             (deref this)
                                                                                                                                             "$constructing")) "undefined")
                                                                                                                            #f
                                                                                                                            #t)
                                                                                                                        (begin
                                                                                                                         (set!
                                                                                                                          this
                                                                                                                          (update-field (deref this)
                                                                                                                           "$proto"
                                                                                                                           $String.prototype))
                                                                                                                         (begin
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$class"
                                                                                                                            "String"))
                                                                                                                          (begin
                                                                                                                           (set!
                                                                                                                            this
                                                                                                                            (update-field (deref this)
                                                                                                                             "$value"
                                                                                                                             (if (=== (typeof $value) "undefined")
                                                                                                                              ""
                                                                                                                              (let
                                                                                                                               (($toStr $value))
                                                                                                                               (if (=== (typeof $toStr) "location")
                                                                                                                                (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                (prim->string $toStr))))))
                                                                                                                           (set!
                                                                                                                            this
                                                                                                                            (update-field (deref this)
                                                                                                                             "length"
                                                                                                                             (str-length (get-field
                                                                                                                                          (deref this)
                                                                                                                                          "$value")))))))
                                                                                                                        (if (=== (typeof $value) "undefined")
                                                                                                                         ""
                                                                                                                         (let
                                                                                                                          (($toStr $value))
                                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                                           (prim->string $toStr)))))))))))))
                                                                             (let
                                                                              ((Boolean (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                              ("$class" "Function")
                                                                                                              ("$strRep" "function Boolean() {\n    [native code]\n}")
                                                                                                              ("prototype" $Boolean.prototype)
                                                                                                              ("length" 1.0)
                                                                                                              ("$code" (lambda (this arguments)
                                                                                                                        (let
                                                                                                                         ((value (get-field
                                                                                                                                  (deref (deref arguments))
                                                                                                                                  "0")))
                                                                                                                         (begin
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$proto"
                                                                                                                            $Boolean.prototype))
                                                                                                                          (begin
                                                                                                                           (set!
                                                                                                                            this
                                                                                                                            (update-field (deref this)
                                                                                                                             "$class"
                                                                                                                             "Boolean"))
                                                                                                                           (set!
                                                                                                                            this
                                                                                                                            (update-field (deref this)
                                                                                                                             "$value"
                                                                                                                             (prim->bool value)))))))))))))
                                                                              (let
                                                                               ((Error (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                             ("$class" "Function")
                                                                                                             ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                             ("length" 1.0)
                                                                                                             ("prototype" $Error.prototype)
                                                                                                             ("$code" (lambda (this arguments)
                                                                                                                       (let
                                                                                                                        ((msg (get-field
                                                                                                                               (deref (deref arguments))
                                                                                                                               "0")))
                                                                                                                        (begin
                                                                                                                         (set!
                                                                                                                          this
                                                                                                                          (update-field (deref this)
                                                                                                                           "$class"
                                                                                                                           "Error"))
                                                                                                                         (begin
                                                                                                                          (set!
                                                                                                                           this
                                                                                                                           (update-field (deref this)
                                                                                                                            "$proto"
                                                                                                                            $Error.prototype))
                                                                                                                          (if (if (=== (typeof msg) "undefined")
                                                                                                                               #f
                                                                                                                               #t)
                                                                                                                           (set!
                                                                                                                            this
                                                                                                                            (update-field (deref this)
                                                                                                                             "message"
                                                                                                                             (let
                                                                                                                              (($toStr msg))
                                                                                                                              (if (=== (typeof $toStr) "location")
                                                                                                                               (prim->string (@toPrimitive_Number $toStr))
                                                                                                                               (prim->string $toStr)))))
                                                                                                                           undefined)))))))))))
                                                                               (let
                                                                                ((ConversionError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                        ("$class" "Function")
                                                                                                                        ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                        ("length" 1.0)
                                                                                                                        ("prototype" $ConversionError.prototype)
                                                                                                                        ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ((msg (get-field
                                                                                                                                          (deref (deref arguments))
                                                                                                                                          "0")))
                                                                                                                                   (begin
                                                                                                                                    (set!
                                                                                                                                     this
                                                                                                                                     (update-field (deref this)
                                                                                                                                      "$class"
                                                                                                                                      "Error"))
                                                                                                                                    (begin
                                                                                                                                     (set!
                                                                                                                                      this
                                                                                                                                      (update-field (deref this)
                                                                                                                                       "$proto"
                                                                                                                                       $ConversionError.prototype))
                                                                                                                                     (if (if (=== (typeof msg) "undefined")
                                                                                                                                          #f
                                                                                                                                          #t)
                                                                                                                                      (set!
                                                                                                                                       this
                                                                                                                                       (update-field (deref this)
                                                                                                                                        "message"
                                                                                                                                        (let
                                                                                                                                         (($toStr msg))
                                                                                                                                         (if (=== (typeof $toStr) "location")
                                                                                                                                          (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                          (prim->string $toStr)))))
                                                                                                                                      undefined)))))))))))
                                                                                (let
                                                                                 ((EvalError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                   ("$class" "Function")
                                                                                                                   ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                   ("length" 1.0)
                                                                                                                   ("prototype" $EvalError.prototype)
                                                                                                                   ("$code" (lambda (this arguments)
                                                                                                                             (let
                                                                                                                              ((msg (get-field
                                                                                                                                     (deref (deref arguments))
                                                                                                                                     "0")))
                                                                                                                              (begin
                                                                                                                               (set!
                                                                                                                                this
                                                                                                                                (update-field (deref this)
                                                                                                                                 "$class"
                                                                                                                                 "Error"))
                                                                                                                               (begin
                                                                                                                                (set!
                                                                                                                                 this
                                                                                                                                 (update-field (deref this)
                                                                                                                                  "$proto"
                                                                                                                                  $EvalError.prototype))
                                                                                                                                (if (if (=== (typeof msg) "undefined")
                                                                                                                                     #f
                                                                                                                                     #t)
                                                                                                                                 (set!
                                                                                                                                  this
                                                                                                                                  (update-field (deref this)
                                                                                                                                   "message"
                                                                                                                                   (let
                                                                                                                                    (($toStr msg))
                                                                                                                                    (if (=== (typeof $toStr) "location")
                                                                                                                                     (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                     (prim->string $toStr)))))
                                                                                                                                 undefined)))))))))))
                                                                                 (let
                                                                                  ((RangeError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                     ("$class" "Function")
                                                                                                                     ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                     ("length" 1.0)
                                                                                                                     ("prototype" $RangeError.prototype)
                                                                                                                     ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ((msg (get-field
                                                                                                                                       (deref (deref arguments))
                                                                                                                                       "0")))
                                                                                                                                (begin
                                                                                                                                 (set!
                                                                                                                                  this
                                                                                                                                  (update-field (deref this)
                                                                                                                                   "$class"
                                                                                                                                   "Error"))
                                                                                                                                 (begin
                                                                                                                                  (set!
                                                                                                                                   this
                                                                                                                                   (update-field (deref this)
                                                                                                                                    "$proto"
                                                                                                                                    $RangeError.prototype))
                                                                                                                                  (if (if (=== (typeof msg) "undefined")
                                                                                                                                       #f
                                                                                                                                       #t)
                                                                                                                                   (set!
                                                                                                                                    this
                                                                                                                                    (update-field (deref this)
                                                                                                                                     "message"
                                                                                                                                     (let
                                                                                                                                      (($toStr msg))
                                                                                                                                      (if (=== (typeof $toStr) "location")
                                                                                                                                       (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                       (prim->string $toStr)))))
                                                                                                                                   undefined)))))))))))
                                                                                  (let
                                                                                   ((ReferenceError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                          ("$class" "Function")
                                                                                                                          ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                          ("length" 1.0)
                                                                                                                          ("prototype" $ReferenceError.prototype)
                                                                                                                          ("$code" (lambda (this arguments)
                                                                                                                                    (let
                                                                                                                                     ((msg (get-field
                                                                                                                                            (deref (deref arguments))
                                                                                                                                            "0")))
                                                                                                                                     (begin
                                                                                                                                      (set!
                                                                                                                                       this
                                                                                                                                       (update-field (deref this)
                                                                                                                                        "$class"
                                                                                                                                        "Error"))
                                                                                                                                      (begin
                                                                                                                                       (set!
                                                                                                                                        this
                                                                                                                                        (update-field (deref this)
                                                                                                                                         "$proto"
                                                                                                                                         $ReferenceError.prototype))
                                                                                                                                       (if (if (=== (typeof msg) "undefined")
                                                                                                                                            #f
                                                                                                                                            #t)
                                                                                                                                        (set!
                                                                                                                                         this
                                                                                                                                         (update-field (deref this)
                                                                                                                                          "message"
                                                                                                                                          (let
                                                                                                                                           (($toStr msg))
                                                                                                                                           (if (=== (typeof $toStr) "location")
                                                                                                                                            (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                            (prim->string $toStr)))))
                                                                                                                                        undefined)))))))))))
                                                                                   (let
                                                                                    ((SyntaxError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                        ("$class" "Function")
                                                                                                                        ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                        ("length" 1.0)
                                                                                                                        ("prototype" $SyntaxError.prototype)
                                                                                                                        ("$code" (lambda (this arguments)
                                                                                                                                  (let
                                                                                                                                   ((msg (get-field
                                                                                                                                          (deref (deref arguments))
                                                                                                                                          "0")))
                                                                                                                                   (begin
                                                                                                                                    (set!
                                                                                                                                     this
                                                                                                                                     (update-field (deref this)
                                                                                                                                      "$class"
                                                                                                                                      "Error"))
                                                                                                                                    (begin
                                                                                                                                     (set!
                                                                                                                                      this
                                                                                                                                      (update-field (deref this)
                                                                                                                                       "$proto"
                                                                                                                                       $SyntaxError.prototype))
                                                                                                                                     (if (if (=== (typeof msg) "undefined")
                                                                                                                                          #f
                                                                                                                                          #t)
                                                                                                                                      (set!
                                                                                                                                       this
                                                                                                                                       (update-field (deref this)
                                                                                                                                        "message"
                                                                                                                                        (let
                                                                                                                                         (($toStr msg))
                                                                                                                                         (if (=== (typeof $toStr) "location")
                                                                                                                                          (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                          (prim->string $toStr)))))
                                                                                                                                      undefined)))))))))))
                                                                                    (let
                                                                                     ((TypeError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                       ("$class" "Function")
                                                                                                                       ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                       ("length" 1.0)
                                                                                                                       ("prototype" $TypeError.prototype)
                                                                                                                       ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ((msg (get-field
                                                                                                                                         (deref (deref arguments))
                                                                                                                                         "0")))
                                                                                                                                  (begin
                                                                                                                                   (set!
                                                                                                                                    this
                                                                                                                                    (update-field (deref this)
                                                                                                                                     "$class"
                                                                                                                                     "Error"))
                                                                                                                                   (begin
                                                                                                                                    (set!
                                                                                                                                     this
                                                                                                                                     (update-field (deref this)
                                                                                                                                      "$proto"
                                                                                                                                      $TypeError.prototype))
                                                                                                                                    (if (if (=== (typeof msg) "undefined")
                                                                                                                                         #f
                                                                                                                                         #t)
                                                                                                                                     (set!
                                                                                                                                      this
                                                                                                                                      (update-field (deref this)
                                                                                                                                       "message"
                                                                                                                                       (let
                                                                                                                                        (($toStr msg))
                                                                                                                                        (if (=== (typeof $toStr) "location")
                                                                                                                                         (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                         (prim->string $toStr)))))
                                                                                                                                     undefined)))))))))))
                                                                                     (let
                                                                                      ((URIError (alloc (alloc (object ("$proto" @Function_prototype)
                                                                                                                       ("$class" "Function")
                                                                                                                       ("$strRep" "function Error() {\n    [native code]\n}")
                                                                                                                       ("length" 1.0)
                                                                                                                       ("prototype" $URIError.prototype)
                                                                                                                       ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ((msg (get-field
                                                                                                                                         (deref (deref arguments))
                                                                                                                                         "0")))
                                                                                                                                  (begin
                                                                                                                                   (set!
                                                                                                                                    this
                                                                                                                                    (update-field (deref this)
                                                                                                                                     "$class"
                                                                                                                                     "Error"))
                                                                                                                                   (begin
                                                                                                                                    (set!
                                                                                                                                     this
                                                                                                                                     (update-field (deref this)
                                                                                                                                      "$proto"
                                                                                                                                      $URIError.prototype))
                                                                                                                                    (if (if (=== (typeof msg) "undefined")
                                                                                                                                         #f
                                                                                                                                         #t)
                                                                                                                                     (set!
                                                                                                                                      this
                                                                                                                                      (update-field (deref this)
                                                                                                                                       "message"
                                                                                                                                       (let
                                                                                                                                        (($toStr msg))
                                                                                                                                        (if (=== (typeof $toStr) "location")
                                                                                                                                         (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                         (prim->string $toStr)))))
                                                                                                                                     undefined)))))))))))
                                                                                      (let
                                                                                       ((@toObject (lambda (x)
                                                                                                    (if (=== (typeof x) "undefined")
                                                                                                     (throw ($makeException "TypeError" ":toObject received undefined"))
                                                                                                     (if (=== x null)
                                                                                                      (throw ($makeException "TypeError" ":toObject received null"))
                                                                                                      (if (=== (typeof x) "boolean")
                                                                                                       (alloc (object ("$proto" $Boolean.prototype)
                                                                                                                      ("$class" "Boolean")
                                                                                                                      ("$value" x)))
                                                                                                       (if (=== (typeof x) "number")
                                                                                                        (alloc (object ("$proto" $Number.prototype)
                                                                                                                       ("$class" "Number")
                                                                                                                       ("$value" x)))
                                                                                                        (if (=== (typeof x) "string")
                                                                                                         (alloc (object ("$proto" $String.prototype)
                                                                                                                        ("$class" "String")
                                                                                                                        ("$value" x)
                                                                                                                        ("length" (str-length x))))
                                                                                                         x))))))))
                                                                                       (begin
                                                                                        (begin
                                                                                         (set!
                                                                                          @Object_prototype
                                                                                          (update-field (deref @Object_prototype)
                                                                                           "constructor"
                                                                                           (deref @Object_prototype)))
                                                                                         (begin
                                                                                          (set!
                                                                                           @Function_prototype
                                                                                           (update-field (deref @Function_prototype)
                                                                                            "constructor"
                                                                                            (deref @Function_prototype)))
                                                                                          (begin
                                                                                           (set!
                                                                                            $Array.prototype
                                                                                            (update-field (deref $Array.prototype)
                                                                                             "constructor"
                                                                                             (deref $Array.prototype)))
                                                                                           (begin
                                                                                            (set!
                                                                                             $String.prototype
                                                                                             (update-field (deref $String.prototype)
                                                                                              "constructor"
                                                                                              (deref $String.prototype)))
                                                                                            (begin
                                                                                             (set!
                                                                                              $RegExp.prototype
                                                                                              (update-field (deref $RegExp.prototype)
                                                                                               "constructor"
                                                                                               (deref $RegExp.prototype)))
                                                                                             (begin
                                                                                              (set!
                                                                                               $Date.prototype
                                                                                               (update-field (deref $Date.prototype)
                                                                                                "constructor"
                                                                                                (deref $Date.prototype)))
                                                                                              (begin
                                                                                               (set!
                                                                                                $Boolean.prototype
                                                                                                (update-field (deref $Boolean.prototype)
                                                                                                 "constructor"
                                                                                                 (deref $Boolean.prototype)))
                                                                                               (begin
                                                                                                (set!
                                                                                                 $Number.prototype
                                                                                                 (update-field (deref $Number.prototype)
                                                                                                  "constructor"
                                                                                                  (deref $Number.prototype)))
                                                                                                (begin
                                                                                                 (set!
                                                                                                  $Error.prototype
                                                                                                  (update-field (deref $Error.prototype)
                                                                                                   "constructor"
                                                                                                   (deref $Error.prototype)))
                                                                                                 (begin
                                                                                                  (set!
                                                                                                   $ConversionError.prototype
                                                                                                   (update-field (deref $ConversionError.prototype)
                                                                                                    "constructor"
                                                                                                    (deref $ConversionError.prototype)))
                                                                                                  (begin
                                                                                                   (set!
                                                                                                    $EvalError.prototype
                                                                                                    (update-field (deref $EvalError.prototype)
                                                                                                     "constructor"
                                                                                                     (deref $EvalError.prototype)))
                                                                                                   (begin
                                                                                                    (set!
                                                                                                     $RangeError.prototype
                                                                                                     (update-field (deref $RangeError.prototype)
                                                                                                      "constructor"
                                                                                                      (deref $RangeError.prototype)))
                                                                                                    (begin
                                                                                                     (set!
                                                                                                      $ReferenceError.prototype
                                                                                                      (update-field (deref $ReferenceError.prototype)
                                                                                                       "constructor"
                                                                                                       (deref $ReferenceError.prototype)))
                                                                                                     (begin
                                                                                                      (set!
                                                                                                       $SyntaxError.prototype
                                                                                                       (update-field (deref $SyntaxError.prototype)
                                                                                                        "constructor"
                                                                                                        (deref $SyntaxError.prototype)))
                                                                                                      (begin
                                                                                                       (set!
                                                                                                        $TypeError.prototype
                                                                                                        (update-field (deref $TypeError.prototype)
                                                                                                         "constructor"
                                                                                                         (deref $TypeError.prototype)))
                                                                                                       (begin
                                                                                                        (set!
                                                                                                         $URIError.prototype
                                                                                                         (update-field (deref $URIError.prototype)
                                                                                                          "constructor"
                                                                                                          (deref $URIError.prototype)))
                                                                                                        undefined))))))))))))))))
                                                                                        (begin
                                                                                         (set!
                                                                                          $global
                                                                                          (update-field (deref $global)
                                                                                           "$proto"
                                                                                           @Object_prototype))
                                                                                         (begin
                                                                                          (set!
                                                                                           $global
                                                                                           (update-field (deref $global)
                                                                                            "$class"
                                                                                            "global"))
                                                                                          (begin
                                                                                           (set!
                                                                                            $global
                                                                                            (update-field (deref $global)
                                                                                             "NaN"
                                                                                             +nan.0))
                                                                                           (begin
                                                                                            (set!
                                                                                             $global
                                                                                             (update-field (deref $global)
                                                                                              "Infinity"
                                                                                              +inf.0))
                                                                                            (begin
                                                                                             (set!
                                                                                              $global
                                                                                              (update-field (deref $global)
                                                                                               "undefined"
                                                                                               undefined))
                                                                                             (begin
                                                                                              (set!
                                                                                               $global
                                                                                               (update-field (deref $global)
                                                                                                "parseInt"
                                                                                                (alloc (object ("$code" (lambda (this arguments)
                                                                                                                         (let
                                                                                                                          ((n (get-field
                                                                                                                               (deref (deref arguments))
                                                                                                                               "0")))
                                                                                                                          (prim->number (let
                                                                                                                                         (($toStr n))
                                                                                                                                         (if (=== (typeof $toStr) "location")
                                                                                                                                          (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                          (prim->string $toStr)))))))
                                                                                                               ("arguments" null)
                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                               ("$proto" @Function_prototype)
                                                                                                               ("length" 1.0)
                                                                                                               ("$strRep" "function fromafunctionboject(){}")))))
                                                                                              (begin
                                                                                               (set!
                                                                                                $global
                                                                                                (update-field (deref $global)
                                                                                                 "parseFloat"
                                                                                                 (alloc (object ("$code" (lambda (this arguments)
                                                                                                                          (let
                                                                                                                           ((n (get-field
                                                                                                                                (deref (deref arguments))
                                                                                                                                "0")))
                                                                                                                           (prim->number (let
                                                                                                                                          (($toStr n))
                                                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                           (prim->string $toStr)))))))
                                                                                                                ("arguments" null)
                                                                                                                ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                ("$proto" @Function_prototype)
                                                                                                                ("length" 1.0)
                                                                                                                ("$strRep" "function fromafunctionboject(){}")))))
                                                                                               (begin
                                                                                                (set!
                                                                                                 $global
                                                                                                 (update-field (deref $global)
                                                                                                  "isNaN"
                                                                                                  (alloc (object ("$code" (lambda (this arguments)
                                                                                                                           (let
                                                                                                                            ((n (get-field
                                                                                                                                 (deref (deref arguments))
                                                                                                                                 "0")))
                                                                                                                            (=== +nan.0 (@toNumber n)))))
                                                                                                                 ("arguments" null)
                                                                                                                 ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                 ("$proto" @Function_prototype)
                                                                                                                 ("length" 1.0)
                                                                                                                 ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                (begin
                                                                                                 (set!
                                                                                                  $global
                                                                                                  (update-field (deref $global)
                                                                                                   "isFinite"
                                                                                                   (alloc (object ("$code" (lambda (this arguments)
                                                                                                                            (let
                                                                                                                             ((x (get-field
                                                                                                                                  (deref (deref arguments))
                                                                                                                                  "0")))
                                                                                                                             (let
                                                                                                                              ((n (@toNumber x)))
                                                                                                                              (if (=== n +nan.0)
                                                                                                                               #f
                                                                                                                               (if (=== n +inf.0)
                                                                                                                                #f
                                                                                                                                (if (=== n -inf.0)
                                                                                                                                 #f
                                                                                                                                 #t)))))))
                                                                                                                  ("arguments" null)
                                                                                                                  ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                  ("$proto" @Function_prototype)
                                                                                                                  ("length" 1.0)
                                                                                                                  ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                 (begin
                                                                                                  (set!
                                                                                                   $global
                                                                                                   (update-field (deref $global)
                                                                                                    "decodeURI"
                                                                                                    (alloc (object ("$code" (lambda (this arguments)
                                                                                                                             (let
                                                                                                                              ((encodedURI (get-field
                                                                                                                                            (deref (deref arguments))
                                                                                                                                            "0")))
                                                                                                                              (let
                                                                                                                               (($toStr encodedURI))
                                                                                                                               (if (=== (typeof $toStr) "location")
                                                                                                                                (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                (prim->string $toStr))))))
                                                                                                                   ("arguments" null)
                                                                                                                   ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                   ("$proto" @Function_prototype)
                                                                                                                   ("length" 1.0)
                                                                                                                   ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                  (begin
                                                                                                   (set!
                                                                                                    $global
                                                                                                    (update-field (deref $global)
                                                                                                     "decodeURIComponent"
                                                                                                     (alloc (object ("$code" (lambda (this arguments)
                                                                                                                              (let
                                                                                                                               ((encodedURIComponent (get-field
                                                                                                                                                      (deref (deref arguments))
                                                                                                                                                      "0")))
                                                                                                                               (let
                                                                                                                                (($toStr encodedURIComponent))
                                                                                                                                (if (=== (typeof $toStr) "location")
                                                                                                                                 (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                 (prim->string $toStr))))))
                                                                                                                    ("arguments" null)
                                                                                                                    ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                    ("$proto" @Function_prototype)
                                                                                                                    ("length" 1.0)
                                                                                                                    ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                   (begin
                                                                                                    (set!
                                                                                                     $global
                                                                                                     (update-field (deref $global)
                                                                                                      "encodeURI"
                                                                                                      (alloc (object ("$code" (lambda (this arguments)
                                                                                                                               (let
                                                                                                                                ((uri (get-field
                                                                                                                                       (deref (deref arguments))
                                                                                                                                       "0")))
                                                                                                                                (let
                                                                                                                                 (($toStr uri))
                                                                                                                                 (if (=== (typeof $toStr) "location")
                                                                                                                                  (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                  (prim->string $toStr))))))
                                                                                                                     ("arguments" null)
                                                                                                                     ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                     ("$proto" @Function_prototype)
                                                                                                                     ("length" 1.0)
                                                                                                                     ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                    (begin
                                                                                                     (set!
                                                                                                      $global
                                                                                                      (update-field (deref $global)
                                                                                                       "encodeURIComponent"
                                                                                                       (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                (let
                                                                                                                                 ((uriComponent (get-field
                                                                                                                                                 (deref (deref arguments))
                                                                                                                                                 "0")))
                                                                                                                                 (let
                                                                                                                                  (($toStr uriComponent))
                                                                                                                                  (if (=== (typeof $toStr) "location")
                                                                                                                                   (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                   (prim->string $toStr))))))
                                                                                                                      ("arguments" null)
                                                                                                                      ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                      ("$proto" @Function_prototype)
                                                                                                                      ("length" 1.0)
                                                                                                                      ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                     (begin
                                                                                                      (set!
                                                                                                       $global
                                                                                                       (update-field (deref $global)
                                                                                                        "eval"
                                                                                                        (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                 (let
                                                                                                                                  ()
                                                                                                                                  eval-semantic-bomb)))
                                                                                                                       ("arguments" null)
                                                                                                                       ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                       ("$proto" @Function_prototype)
                                                                                                                       ("length" 0.0)
                                                                                                                       ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                      (begin
                                                                                                       (set!
                                                                                                        $global
                                                                                                        (update-field (deref $global)
                                                                                                         "Object"
                                                                                                         (deref Object)))
                                                                                                       (begin
                                                                                                        (set!
                                                                                                         $global
                                                                                                         (update-field (deref $global)
                                                                                                          "Function"
                                                                                                          (deref Function)))
                                                                                                        (begin
                                                                                                         (set!
                                                                                                          $global
                                                                                                          (update-field (deref $global)
                                                                                                           "Array"
                                                                                                           (deref Array)))
                                                                                                         (begin
                                                                                                          (set!
                                                                                                           $global
                                                                                                           (update-field (deref $global)
                                                                                                            "RegExp"
                                                                                                            (deref RegExp)))
                                                                                                          (begin
                                                                                                           (set!
                                                                                                            $global
                                                                                                            (update-field (deref $global)
                                                                                                             "String"
                                                                                                             (deref String)))
                                                                                                           (begin
                                                                                                            (set!
                                                                                                             $global
                                                                                                             (update-field (deref $global)
                                                                                                              "Date"
                                                                                                              (deref Date)))
                                                                                                            (begin
                                                                                                             (set!
                                                                                                              $global
                                                                                                              (update-field (deref $global)
                                                                                                               "Number"
                                                                                                               (deref Number)))
                                                                                                             (begin
                                                                                                              (set!
                                                                                                               $global
                                                                                                               (update-field (deref $global)
                                                                                                                "Boolean"
                                                                                                                (deref Boolean)))
                                                                                                              (begin
                                                                                                               (set!
                                                                                                                $global
                                                                                                                (update-field (deref $global)
                                                                                                                 "Error"
                                                                                                                 (deref Error)))
                                                                                                               (begin
                                                                                                                (set!
                                                                                                                 $global
                                                                                                                 (update-field (deref $global)
                                                                                                                  "ConversionError"
                                                                                                                  (deref ConversionError)))
                                                                                                                (begin
                                                                                                                 (set!
                                                                                                                  $global
                                                                                                                  (update-field (deref $global)
                                                                                                                   "EvalError"
                                                                                                                   (deref EvalError)))
                                                                                                                 (begin
                                                                                                                  (set!
                                                                                                                   $global
                                                                                                                   (update-field (deref $global)
                                                                                                                    "RangeError"
                                                                                                                    (deref RangeError)))
                                                                                                                  (begin
                                                                                                                   (set!
                                                                                                                    $global
                                                                                                                    (update-field (deref $global)
                                                                                                                     "ReferenceError"
                                                                                                                     (deref ReferenceError)))
                                                                                                                   (begin
                                                                                                                    (set!
                                                                                                                     $global
                                                                                                                     (update-field (deref $global)
                                                                                                                      "SyntaxError"
                                                                                                                      (deref SyntaxError)))
                                                                                                                    (begin
                                                                                                                     (set!
                                                                                                                      $global
                                                                                                                      (update-field (deref $global)
                                                                                                                       "TypeError"
                                                                                                                       (deref TypeError)))
                                                                                                                     (begin
                                                                                                                      (set!
                                                                                                                       $global
                                                                                                                       (update-field (deref $global)
                                                                                                                        "URIError"
                                                                                                                        (deref URIError)))
                                                                                                                      (begin
                                                                                                                       (set!
                                                                                                                        $global
                                                                                                                        (update-field (deref $global)
                                                                                                                         "print"
                                                                                                                         (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                  (let
                                                                                                                                                   ((V (get-field
                                                                                                                                                        (deref (deref arguments))
                                                                                                                                                        "0")))
                                                                                                                                                   (print-string (let
                                                                                                                                                                  (($toStr V))
                                                                                                                                                                  (if (=== (typeof $toStr) "location")
                                                                                                                                                                   (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                   (prim->string $toStr)))))))
                                                                                                                                        ("arguments" null)
                                                                                                                                        ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                        ("$proto" @Function_prototype)
                                                                                                                                        ("length" 1.0)
                                                                                                                                        ("$strRep" "function fromafunctionboject(){}")))))
                                                                                                                       (begin
                                                                                                                        (set!
                                                                                                                         $global
                                                                                                                         (update-field (deref $global)
                                                                                                                          "Math"
                                                                                                                          (alloc (object ("$class" "Math")
                                                                                                                                         ("$proto" @Object_prototype)
                                                                                                                                         ("E" 2.718281828459045)
                                                                                                                                         ("LN10" 2.302585092994046)
                                                                                                                                         ("LN2" 0.6931471805599453)
                                                                                                                                         ("LOG2E" 1.4426950408889634)
                                                                                                                                         ("LOG10E" 0.43429448190325176)
                                                                                                                                         ("PI" 3.141592653589793)
                                                                                                                                         ("SQRT1_2" 0.7071067811865476)
                                                                                                                                         ("SQRT2" 1.4142135623730951)
                                                                                                                                         ("exp" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                         (let
                                                                                                                                                                          ((x (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "0")))
                                                                                                                                                                          (math-exp (@toNumber x)))))
                                                                                                                                                               ("arguments" null)
                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                                                               ("length" 1.0)
                                                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                                                         ("log" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                         (let
                                                                                                                                                                          ((x (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "0")))
                                                                                                                                                                          (math-log (@toNumber x)))))
                                                                                                                                                               ("arguments" null)
                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                                                               ("length" 1.0)
                                                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                                                         ("sin" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                         (let
                                                                                                                                                                          ((x (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "0")))
                                                                                                                                                                          (math-sin (@toNumber x)))))
                                                                                                                                                               ("arguments" null)
                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                                                               ("length" 1.0)
                                                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                                                         ("cos" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                         (let
                                                                                                                                                                          ((x (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "0")))
                                                                                                                                                                          (math-cos (@toNumber x)))))
                                                                                                                                                               ("arguments" null)
                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                                                               ("length" 1.0)
                                                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                                                         ("abs" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                         (let
                                                                                                                                                                          ((x (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "0")))
                                                                                                                                                                          (math-abs (@toNumber x)))))
                                                                                                                                                               ("arguments" null)
                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                                                               ("length" 1.0)
                                                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))
                                                                                                                                         ("pow" (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                         (let
                                                                                                                                                                          ((x (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "0"))
                                                                                                                                                                           (y (get-field
                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                               "1")))
                                                                                                                                                                          (math-pow (@toNumber x) (@toNumber y)))))
                                                                                                                                                               ("arguments" null)
                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype))))
                                                                                                                                                               ("$proto" @Function_prototype)
                                                                                                                                                               ("length" 2.0)
                                                                                                                                                               ("$strRep" "function fromafunctionboject(){}"))))))))
                                                                                                                        (let
                                                                                                                         ((this $global))
                                                                                                                         (begin
                                                                                                                          (let
                                                                                                                           (($15
                                                                                                                             (get-field
                                                                                                                              (deref (@toObject (get-field
                                                                                                                                                 (deref $global)
                                                                                                                                                 "Array")))
                                                                                                                              "prototype"))
                                                                                                                            ($16
                                                                                                                             "join"))
                                                                                                                           (let
                                                                                                                            (($17
                                                                                                                              (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                       (let
                                                                                                                                                        ((separator (alloc (get-field
                                                                                                                                                                            (deref (deref arguments))
                                                                                                                                                                            "0"))))
                                                                                                                                                        (let
                                                                                                                                                         ((l (alloc undefined))
                                                                                                                                                          (R (alloc undefined))
                                                                                                                                                          (k (alloc undefined))
                                                                                                                                                          (S (alloc undefined))
                                                                                                                                                          (x (alloc undefined)))
                                                                                                                                                         (label $return
                                                                                                                                                          (begin
                                                                                                                                                           (begin
                                                                                                                                                            (set!
                                                                                                                                                             l
                                                                                                                                                             (get-field
                                                                                                                                                              (deref (@toObject this))
                                                                                                                                                              "length"))
                                                                                                                                                            undefined)
                                                                                                                                                           (begin
                                                                                                                                                            (if (prim->bool (@OpStrictEq (deref separator) (get-field
                                                                                                                                                                                                            (deref $global)
                                                                                                                                                                                                            "undefined")))
                                                                                                                                                             (begin
                                                                                                                                                              (set!
                                                                                                                                                               separator
                                                                                                                                                               ",")
                                                                                                                                                              (deref separator))
                                                                                                                                                             undefined)
                                                                                                                                                            (begin
                                                                                                                                                             (begin
                                                                                                                                                              (set!
                                                                                                                                                               separator
                                                                                                                                                               (@OpAdd "" (deref separator)))
                                                                                                                                                              (deref separator))
                                                                                                                                                             (begin
                                                                                                                                                              (if (prim->bool (@OpStrictEq (deref l) 0.0))
                                                                                                                                                               (break $return
                                                                                                                                                                "")
                                                                                                                                                               undefined)
                                                                                                                                                              (begin
                                                                                                                                                               (begin
                                                                                                                                                                (set!
                                                                                                                                                                 R
                                                                                                                                                                 (get-field
                                                                                                                                                                  (deref (@toObject this))
                                                                                                                                                                  (let
                                                                                                                                                                   (($toStr 0.0))
                                                                                                                                                                   (if (=== (typeof $toStr) "location")
                                                                                                                                                                    (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                    (prim->string $toStr)))))
                                                                                                                                                                undefined)
                                                                                                                                                               (begin
                                                                                                                                                                (if (@OpLOr (@OpStrictEq (deref R) (get-field
                                                                                                                                                                                                    (deref $global)
                                                                                                                                                                                                    "undefined")) (@OpStrictEq (deref R) null))
                                                                                                                                                                 (begin
                                                                                                                                                                  (set!
                                                                                                                                                                   R
                                                                                                                                                                   "")
                                                                                                                                                                  (deref R))
                                                                                                                                                                 (begin
                                                                                                                                                                  (set!
                                                                                                                                                                   R
                                                                                                                                                                   (@OpAdd "" (deref R)))
                                                                                                                                                                  (deref R)))
                                                                                                                                                                (begin
                                                                                                                                                                 (begin
                                                                                                                                                                  (begin
                                                                                                                                                                   (set!
                                                                                                                                                                    k
                                                                                                                                                                    1.0)
                                                                                                                                                                   undefined)
                                                                                                                                                                  (label $break
                                                                                                                                                                   (while
                                                                                                                                                                    (prim->bool (@OpLT (deref k) (deref l)))
                                                                                                                                                                    (begin
                                                                                                                                                                     (label $continue
                                                                                                                                                                      (begin
                                                                                                                                                                       (begin
                                                                                                                                                                        (set!
                                                                                                                                                                         S
                                                                                                                                                                         (@OpAdd (deref R) (deref separator)))
                                                                                                                                                                        undefined)
                                                                                                                                                                       (begin
                                                                                                                                                                        (begin
                                                                                                                                                                         (set!
                                                                                                                                                                          x
                                                                                                                                                                          (get-field
                                                                                                                                                                           (deref (@toObject this))
                                                                                                                                                                           (let
                                                                                                                                                                            (($toStr (deref k)))
                                                                                                                                                                            (if (=== (typeof $toStr) "location")
                                                                                                                                                                             (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                             (prim->string $toStr)))))
                                                                                                                                                                         undefined)
                                                                                                                                                                        (if (@OpLOr (@OpStrictEq (deref x) (get-field
                                                                                                                                                                                                            (deref $global)
                                                                                                                                                                                                            "undefined")) (@OpStrictEq (deref x) null))
                                                                                                                                                                         (begin
                                                                                                                                                                          (set!
                                                                                                                                                                           R
                                                                                                                                                                           (@OpAdd (deref S) ""))
                                                                                                                                                                          (deref R))
                                                                                                                                                                         (begin
                                                                                                                                                                          (set!
                                                                                                                                                                           R
                                                                                                                                                                           (@OpAdd (deref S) (@OpAdd "" (deref x))))
                                                                                                                                                                          (deref R))))))
                                                                                                                                                                     (let
                                                                                                                                                                      (($18
                                                                                                                                                                        (+ (@toNumber (deref k)) 1.0)))
                                                                                                                                                                      (begin
                                                                                                                                                                       (set!
                                                                                                                                                                        k
                                                                                                                                                                        $18)
                                                                                                                                                                       (deref k)))))))
                                                                                                                                                                 (break $return
                                                                                                                                                                  (deref R))))))))))))))
                                                                                                                                             ("arguments" null)
                                                                                                                                             ("prototype" (alloc (object ("$proto" @Object_prototype)
                                                                                                                                                                         ("$class" "Object"))))
                                                                                                                                             ("$strRep" "function (separator) {\n    [cant look here]\n}")
                                                                                                                                             ("$proto" @Function_prototype)))))
                                                                                                                            (begin
                                                                                                                             (if (=== (get-field
                                                                                                                                       (deref $15)
                                                                                                                                       "$class") "Array")
                                                                                                                              (@setArray $15 $16 $17)
                                                                                                                              (set!
                                                                                                                               $15
                                                                                                                               (update-field (deref $15)
                                                                                                                                $16
                                                                                                                                $17)))
                                                                                                                             $17)))
                                                                                                                          (begin
                                                                                                                           (let
                                                                                                                            (($19
                                                                                                                              (get-field
                                                                                                                               (deref (@toObject (get-field
                                                                                                                                                  (deref $global)
                                                                                                                                                  "Array")))
                                                                                                                               "prototype"))
                                                                                                                             ($20
                                                                                                                              "toLocaleString"))
                                                                                                                            (let
                                                                                                                             (($21
                                                                                                                               (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                        (let
                                                                                                                                                         ((l (alloc undefined))
                                                                                                                                                          (separator (alloc undefined))
                                                                                                                                                          (R (alloc undefined))
                                                                                                                                                          (k (alloc undefined))
                                                                                                                                                          (S (alloc undefined))
                                                                                                                                                          (x (alloc undefined)))
                                                                                                                                                         (label $return
                                                                                                                                                          (begin
                                                                                                                                                           (begin
                                                                                                                                                            (set!
                                                                                                                                                             l
                                                                                                                                                             (get-field
                                                                                                                                                              (deref (@toObject this))
                                                                                                                                                              "length"))
                                                                                                                                                            undefined)
                                                                                                                                                           (begin
                                                                                                                                                            (begin
                                                                                                                                                             (set!
                                                                                                                                                              separator
                                                                                                                                                              ",")
                                                                                                                                                             undefined)
                                                                                                                                                            (begin
                                                                                                                                                             (if (prim->bool (@OpStrictEq (deref l) 0.0))
                                                                                                                                                              (break $return
                                                                                                                                                               "")
                                                                                                                                                              undefined)
                                                                                                                                                             (begin
                                                                                                                                                              (begin
                                                                                                                                                               (set!
                                                                                                                                                                R
                                                                                                                                                                (get-field
                                                                                                                                                                 (deref (@toObject this))
                                                                                                                                                                 (let
                                                                                                                                                                  (($toStr 0.0))
                                                                                                                                                                  (if (=== (typeof $toStr) "location")
                                                                                                                                                                   (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                   (prim->string $toStr)))))
                                                                                                                                                               undefined)
                                                                                                                                                              (begin
                                                                                                                                                               (if (@OpLOr (@OpStrictEq (deref R) (get-field
                                                                                                                                                                                                   (deref $global)
                                                                                                                                                                                                   "undefined")) (@OpStrictEq (deref R) null))
                                                                                                                                                                (begin
                                                                                                                                                                 (set!
                                                                                                                                                                  R
                                                                                                                                                                  "")
                                                                                                                                                                 (deref R))
                                                                                                                                                                (begin
                                                                                                                                                                 (set!
                                                                                                                                                                  R
                                                                                                                                                                  (let
                                                                                                                                                                   (($obj (@toObject (deref R))))
                                                                                                                                                                   (let
                                                                                                                                                                    (($22
                                                                                                                                                                      (get-field
                                                                                                                                                                       (deref $obj)
                                                                                                                                                                       "toLocaleString")))
                                                                                                                                                                    ((get-field
                                                                                                                                                                      (deref $22)
                                                                                                                                                                      "$code") $obj (alloc (alloc (object ("length" 0.0)
                                                                                                                                                                                                          ("callee" $22)
                                                                                                                                                                                                          ("$class" "Object")
                                                                                                                                                                                                          ("$proto" @Object_prototype)
                                                                                                                                                                                                          ("$isArgs" #t))))))))
                                                                                                                                                                 (deref R)))
                                                                                                                                                               (begin
                                                                                                                                                                (begin
                                                                                                                                                                 (begin
                                                                                                                                                                  (set!
                                                                                                                                                                   k
                                                                                                                                                                   1.0)
                                                                                                                                                                  undefined)
                                                                                                                                                                 (label $break
                                                                                                                                                                  (while
                                                                                                                                                                   (prim->bool (@OpLT (deref k) (deref l)))
                                                                                                                                                                   (begin
                                                                                                                                                                    (label $continue
                                                                                                                                                                     (begin
                                                                                                                                                                      (begin
                                                                                                                                                                       (set!
                                                                                                                                                                        S
                                                                                                                                                                        (@OpAdd (deref R) (deref separator)))
                                                                                                                                                                       undefined)
                                                                                                                                                                      (begin
                                                                                                                                                                       (begin
                                                                                                                                                                        (set!
                                                                                                                                                                         x
                                                                                                                                                                         (get-field
                                                                                                                                                                          (deref (@toObject this))
                                                                                                                                                                          (let
                                                                                                                                                                           (($toStr (deref k)))
                                                                                                                                                                           (if (=== (typeof $toStr) "location")
                                                                                                                                                                            (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                            (prim->string $toStr)))))
                                                                                                                                                                        undefined)
                                                                                                                                                                       (if (@OpLOr (@OpStrictEq (deref x) (get-field
                                                                                                                                                                                                           (deref $global)
                                                                                                                                                                                                           "undefined")) (@OpStrictEq (deref x) null))
                                                                                                                                                                        (begin
                                                                                                                                                                         (set!
                                                                                                                                                                          R
                                                                                                                                                                          (@OpAdd (deref S) ""))
                                                                                                                                                                         (deref R))
                                                                                                                                                                        (begin
                                                                                                                                                                         (set!
                                                                                                                                                                          R
                                                                                                                                                                          (@OpAdd (deref S) (let
                                                                                                                                                                                             (($obj (@toObject (deref x))))
                                                                                                                                                                                             (let
                                                                                                                                                                                              (($23
                                                                                                                                                                                                (get-field
                                                                                                                                                                                                 (deref $obj)
                                                                                                                                                                                                 "toLocaleString")))
                                                                                                                                                                                              ((get-field
                                                                                                                                                                                                (deref $23)
                                                                                                                                                                                                "$code") $obj (alloc (alloc (object ("length" 0.0)
                                                                                                                                                                                                                                    ("callee" $23)
                                                                                                                                                                                                                                    ("$class" "Object")
                                                                                                                                                                                                                                    ("$proto" @Object_prototype)
                                                                                                                                                                                                                                    ("$isArgs" #t)))))))))
                                                                                                                                                                         (deref R))))))
                                                                                                                                                                    (let
                                                                                                                                                                     (($24
                                                                                                                                                                       (+ (@toNumber (deref k)) 1.0)))
                                                                                                                                                                     (begin
                                                                                                                                                                      (set!
                                                                                                                                                                       k
                                                                                                                                                                       $24)
                                                                                                                                                                      (deref k)))))))
                                                                                                                                                                (break $return
                                                                                                                                                                 (deref R))))))))))))
                                                                                                                                              ("arguments" null)
                                                                                                                                              ("prototype" (alloc (object ("$proto" @Object_prototype)
                                                                                                                                                                          ("$class" "Object"))))
                                                                                                                                              ("$strRep" "function () {\n    [cant look here]\n}")
                                                                                                                                              ("$proto" @Function_prototype)))))
                                                                                                                             (begin
                                                                                                                              (if (=== (get-field
                                                                                                                                        (deref $19)
                                                                                                                                        "$class") "Array")
                                                                                                                               (@setArray $19 $20 $21)
                                                                                                                               (set!
                                                                                                                                $19
                                                                                                                                (update-field (deref $19)
                                                                                                                                 $20
                                                                                                                                 $21)))
                                                                                                                              $21)))
                                                                                                                           (begin
                                                                                                                            (let
                                                                                                                             (($25
                                                                                                                               (get-field
                                                                                                                                (deref (@toObject (get-field
                                                                                                                                                   (deref $global)
                                                                                                                                                   "Array")))
                                                                                                                                "prototype"))
                                                                                                                              ($26
                                                                                                                               "sort"))
                                                                                                                             (let
                                                                                                                              (($27
                                                                                                                                (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                         (let
                                                                                                                                                          ((comparefn (get-field
                                                                                                                                                                       (deref (deref arguments))
                                                                                                                                                                       "0")))
                                                                                                                                                          (let
                                                                                                                                                           ((l (alloc undefined))
                                                                                                                                                            (sortCompare (alloc undefined))
                                                                                                                                                            (i (alloc undefined))
                                                                                                                                                            (min (alloc undefined))
                                                                                                                                                            (j (alloc undefined))
                                                                                                                                                            (tmp (alloc undefined)))
                                                                                                                                                           (label $return
                                                                                                                                                            (begin
                                                                                                                                                             (begin
                                                                                                                                                              (set!
                                                                                                                                                               l
                                                                                                                                                               (get-field
                                                                                                                                                                (deref (@toObject this))
                                                                                                                                                                "length"))
                                                                                                                                                              undefined)
                                                                                                                                                             (begin
                                                                                                                                                              (begin
                                                                                                                                                               (set!
                                                                                                                                                                sortCompare
                                                                                                                                                                (alloc (object ("$code" (lambda (this arguments)
                                                                                                                                                                                         (let
                                                                                                                                                                                          ((x (get-field
                                                                                                                                                                                               (deref (deref arguments))
                                                                                                                                                                                               "0")))
                                                                                                                                                                                          (let
                                                                                                                                                                                           ((y (get-field
                                                                                                                                                                                                (deref (deref arguments))
                                                                                                                                                                                                "1")))
                                                                                                                                                                                           (let
                                                                                                                                                                                            ((xs (alloc undefined))
                                                                                                                                                                                             (ys (alloc undefined)))
                                                                                                                                                                                            (label $return
                                                                                                                                                                                             (begin
                                                                                                                                                                                              (if (prim->bool (@OpLAnd (@OpStrictEq x (get-field
                                                                                                                                                                                                                                       (deref $global)
                                                                                                                                                                                                                                       "undefined")) (@OpStrictEq y (get-field
                                                                                                                                                                                                                                                                     (deref $global)
                                                                                                                                                                                                                                                                     "undefined"))))
                                                                                                                                                                                               (break $return
                                                                                                                                                                                                0.0)
                                                                                                                                                                                               undefined)
                                                                                                                                                                                              (begin
                                                                                                                                                                                               (if (prim->bool (@OpStrictEq x (get-field
                                                                                                                                                                                                                               (deref $global)
                                                                                                                                                                                                                               "undefined")))
                                                                                                                                                                                                (break $return
                                                                                                                                                                                                 1.0)
                                                                                                                                                                                                undefined)
                                                                                                                                                                                               (begin
                                                                                                                                                                                                (if (prim->bool (@OpStrictEq y (get-field
                                                                                                                                                                                                                                (deref $global)
                                                                                                                                                                                                                                "undefined")))
                                                                                                                                                                                                 (break $return
                                                                                                                                                                                                  (@PrefixMinus 1.0))
                                                                                                                                                                                                 undefined)
                                                                                                                                                                                                (begin
                                                                                                                                                                                                 (if (prim->bool (@OpStrictEq comparefn (get-field
                                                                                                                                                                                                                                         (deref $global)
                                                                                                                                                                                                                                         "undefined")))
                                                                                                                                                                                                  (begin
                                                                                                                                                                                                   (begin
                                                                                                                                                                                                    (set!
                                                                                                                                                                                                     xs
                                                                                                                                                                                                     (@OpAdd "" x))
                                                                                                                                                                                                    undefined)
                                                                                                                                                                                                   (begin
                                                                                                                                                                                                    (begin
                                                                                                                                                                                                     (set!
                                                                                                                                                                                                      ys
                                                                                                                                                                                                      (@OpAdd "" y))
                                                                                                                                                                                                     undefined)
                                                                                                                                                                                                    (begin
                                                                                                                                                                                                     (if (prim->bool (@OpLT (deref xs) (deref ys)))
                                                                                                                                                                                                      (break $return
                                                                                                                                                                                                       (@PrefixMinus 1.0))
                                                                                                                                                                                                      undefined)
                                                                                                                                                                                                     (begin
                                                                                                                                                                                                      (if (prim->bool (@OpLT (deref ys) (deref xs)))
                                                                                                                                                                                                       (break $return
                                                                                                                                                                                                        1.0)
                                                                                                                                                                                                       undefined)
                                                                                                                                                                                                      (break $return
                                                                                                                                                                                                       0.0)))))
                                                                                                                                                                                                  undefined)
                                                                                                                                                                                                 (break $return
                                                                                                                                                                                                  (let
                                                                                                                                                                                                   (($obj comparefn))
                                                                                                                                                                                                   (if (if (@isRefComb (lambda (@x)
                                                                                                                                                                                                                        (let
                                                                                                                                                                                                                         (($isF @x))
                                                                                                                                                                                                                         (if (=== (typeof $isF) "object")
                                                                                                                                                                                                                          (=== (typeof (get-field
                                                                                                                                                                                                                                        $isF
                                                                                                                                                                                                                                        "$code")) "lambda")
                                                                                                                                                                                                                          #f))) $obj)
                                                                                                                                                                                                        #f
                                                                                                                                                                                                        #t)
                                                                                                                                                                                                    (throw ($makeException "TypeError" ":CallExpr given non-function"))
                                                                                                                                                                                                    (let
                                                                                                                                                                                                     (($28
                                                                                                                                                                                                       $obj))
                                                                                                                                                                                                     ((get-field
                                                                                                                                                                                                       (deref $28)
                                                                                                                                                                                                       "$code") $global (alloc (alloc (object ("length" 2.0)
                                                                                                                                                                                                                                              ("callee" $28)
                                                                                                                                                                                                                                              ("$class" "Object")
                                                                                                                                                                                                                                              ("$proto" @Object_prototype)
                                                                                                                                                                                                                                              ("$isArgs" #t)
                                                                                                                                                                                                                                              ("0" x)
                                                                                                                                                                                                                                              ("1" y)))))))))))))))))))
                                                                                                                                                                               ("arguments" null)
                                                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype)
                                                                                                                                                                                                           ("$class" "Object"))))
                                                                                                                                                                               ("$strRep" "function (x,y) {\n    [cant look here]\n}")
                                                                                                                                                                               ("$proto" @Function_prototype))))
                                                                                                                                                               undefined)
                                                                                                                                                              (begin
                                                                                                                                                               (begin
                                                                                                                                                                (set!
                                                                                                                                                                 i
                                                                                                                                                                 0.0)
                                                                                                                                                                undefined)
                                                                                                                                                               (label $break
                                                                                                                                                                (while
                                                                                                                                                                 (prim->bool (@OpLT (deref i) (@OpSub (deref l) 1.0)))
                                                                                                                                                                 (begin
                                                                                                                                                                  (label $continue
                                                                                                                                                                   (begin
                                                                                                                                                                    (begin
                                                                                                                                                                     (set!
                                                                                                                                                                      min
                                                                                                                                                                      (deref i))
                                                                                                                                                                     undefined)
                                                                                                                                                                    (begin
                                                                                                                                                                     (begin
                                                                                                                                                                      (begin
                                                                                                                                                                       (set!
                                                                                                                                                                        j
                                                                                                                                                                        (@OpAdd (deref i) 1.0))
                                                                                                                                                                       undefined)
                                                                                                                                                                      (label $break
                                                                                                                                                                       (while
                                                                                                                                                                        (prim->bool (@OpLT (deref j) (deref l)))
                                                                                                                                                                        (begin
                                                                                                                                                                         (label $continue
                                                                                                                                                                          (if (prim->bool (@OpLT (let
                                                                                                                                                                                                  (($obj (deref sortCompare)))
                                                                                                                                                                                                  (if (if (@isRefComb (lambda (@x)
                                                                                                                                                                                                                       (let
                                                                                                                                                                                                                        (($isF @x))
                                                                                                                                                                                                                        (if (=== (typeof $isF) "object")
                                                                                                                                                                                                                         (=== (typeof (get-field
                                                                                                                                                                                                                                       $isF
                                                                                                                                                                                                                                       "$code")) "lambda")
                                                                                                                                                                                                                         #f))) $obj)
                                                                                                                                                                                                       #f
                                                                                                                                                                                                       #t)
                                                                                                                                                                                                   (throw ($makeException "TypeError" ":CallExpr given non-function"))
                                                                                                                                                                                                   (let
                                                                                                                                                                                                    (($29
                                                                                                                                                                                                      $obj))
                                                                                                                                                                                                    ((get-field
                                                                                                                                                                                                      (deref $29)
                                                                                                                                                                                                      "$code") $global (alloc (alloc (object ("length" 2.0)
                                                                                                                                                                                                                                             ("callee" $29)
                                                                                                                                                                                                                                             ("$class" "Object")
                                                                                                                                                                                                                                             ("$proto" @Object_prototype)
                                                                                                                                                                                                                                             ("$isArgs" #t)
                                                                                                                                                                                                                                             ("0" (get-field
                                                                                                                                                                                                                                                   (deref (@toObject this))
                                                                                                                                                                                                                                                   (let
                                                                                                                                                                                                                                                    (($toStr (deref j)))
                                                                                                                                                                                                                                                    (if (=== (typeof $toStr) "location")
                                                                                                                                                                                                                                                     (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                                                                                     (prim->string $toStr)))))
                                                                                                                                                                                                                                             ("1" (get-field
                                                                                                                                                                                                                                                   (deref (@toObject this))
                                                                                                                                                                                                                                                   (let
                                                                                                                                                                                                                                                    (($toStr (deref i)))
                                                                                                                                                                                                                                                    (if (=== (typeof $toStr) "location")
                                                                                                                                                                                                                                                     (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                                                                                                     (prim->string $toStr)))))))))))) 0.0))
                                                                                                                                                                           (begin
                                                                                                                                                                            (set!
                                                                                                                                                                             min
                                                                                                                                                                             (deref j))
                                                                                                                                                                            (deref min))
                                                                                                                                                                           undefined))
                                                                                                                                                                         (let
                                                                                                                                                                          (($30
                                                                                                                                                                            (deref j)))
                                                                                                                                                                          (begin
                                                                                                                                                                           (begin
                                                                                                                                                                            (set!
                                                                                                                                                                             j
                                                                                                                                                                             (+ 1.0 (@toNumber $30)))
                                                                                                                                                                            (deref j))
                                                                                                                                                                           $30))))))
                                                                                                                                                                     (begin
                                                                                                                                                                      (begin
                                                                                                                                                                       (set!
                                                                                                                                                                        tmp
                                                                                                                                                                        (get-field
                                                                                                                                                                         (deref (@toObject this))
                                                                                                                                                                         (let
                                                                                                                                                                          (($toStr (deref i)))
                                                                                                                                                                          (if (=== (typeof $toStr) "location")
                                                                                                                                                                           (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                           (prim->string $toStr)))))
                                                                                                                                                                       undefined)
                                                                                                                                                                      (begin
                                                                                                                                                                       (let
                                                                                                                                                                        (($31
                                                                                                                                                                          this)
                                                                                                                                                                         ($32
                                                                                                                                                                          (let
                                                                                                                                                                           (($toStr (deref i)))
                                                                                                                                                                           (if (=== (typeof $toStr) "location")
                                                                                                                                                                            (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                            (prim->string $toStr)))))
                                                                                                                                                                        (let
                                                                                                                                                                         (($33
                                                                                                                                                                           (get-field
                                                                                                                                                                            (deref (@toObject this))
                                                                                                                                                                            (let
                                                                                                                                                                             (($toStr (deref min)))
                                                                                                                                                                             (if (=== (typeof $toStr) "location")
                                                                                                                                                                              (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                              (prim->string $toStr))))))
                                                                                                                                                                         (begin
                                                                                                                                                                          (if (=== (get-field
                                                                                                                                                                                    (deref $31)
                                                                                                                                                                                    "$class") "Array")
                                                                                                                                                                           (@setArray $31 $32 $33)
                                                                                                                                                                           (set!
                                                                                                                                                                            $31
                                                                                                                                                                            (update-field (deref $31)
                                                                                                                                                                             $32
                                                                                                                                                                             $33)))
                                                                                                                                                                          $33)))
                                                                                                                                                                       (let
                                                                                                                                                                        (($34
                                                                                                                                                                          this)
                                                                                                                                                                         ($35
                                                                                                                                                                          (let
                                                                                                                                                                           (($toStr (deref min)))
                                                                                                                                                                           (if (=== (typeof $toStr) "location")
                                                                                                                                                                            (prim->string (@toPrimitive_Number $toStr))
                                                                                                                                                                            (prim->string $toStr)))))
                                                                                                                                                                        (let
                                                                                                                                                                         (($36
                                                                                                                                                                           (deref tmp)))
                                                                                                                                                                         (begin
                                                                                                                                                                          (if (=== (get-field
                                                                                                                                                                                    (deref $34)
                                                                                                                                                                                    "$class") "Array")
                                                                                                                                                                           (@setArray $34 $35 $36)
                                                                                                                                                                           (set!
                                                                                                                                                                            $34
                                                                                                                                                                            (update-field (deref $34)
                                                                                                                                                                             $35
                                                                                                                                                                             $36)))
                                                                                                                                                                          $36))))))))
                                                                                                                                                                  (let
                                                                                                                                                                   (($37
                                                                                                                                                                     (deref i)))
                                                                                                                                                                   (begin
                                                                                                                                                                    (begin
                                                                                                                                                                     (set!
                                                                                                                                                                      i
                                                                                                                                                                      (+ 1.0 (@toNumber $37)))
                                                                                                                                                                     (deref i))
                                                                                                                                                                    $37)))))))))))))
                                                                                                                                               ("arguments" null)
                                                                                                                                               ("prototype" (alloc (object ("$proto" @Object_prototype)
                                                                                                                                                                           ("$class" "Object"))))
                                                                                                                                               ("$strRep" "function (comparefn) {\n    [cant look here]\n}")
                                                                                                                                               ("$proto" @Function_prototype)))))
                                                                                                                              (begin
                                                                                                                               (if (=== (get-field
                                                                                                                                         (deref $25)
                                                                                                                                         "$class") "Array")
                                                                                                                                (@setArray $25 $26 $27)
                                                                                                                                (set!
                                                                                                                                 $25
                                                                                                                                 (update-field (deref $25)
                                                                                                                                  $26
                                                                                                                                  $27)))
                                                                                                                               $27)))
                                                                                                                            (begin
                                                                                                                             (get-field
                                                                                                                              (deref $global)
                                                                                                                              "undefined")
                                                                                                                             undefined)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))